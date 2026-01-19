/**
 * API client for Elite Skills Plugin
 * Handles authenticated requests to the Elite Skills API
 */

import { getApiKey } from './config';
import {
  loadSkillCache,
  saveSkillCache,
  getSkillCacheEtag,
} from './cache';
import {
  ApiError,
  ConfigurationError,
  SkillContent,
  ApiErrorResponse,
} from './types';

const API_BASE_URL = 'https://skills.1shotlabs.com/api';
const USER_AGENT = 'EliteSkillsPlugin/1.0';

/**
 * Handle API error responses and return appropriate error
 */
async function handleApiError(response: Response): Promise<ApiError> {
  let data: ApiErrorResponse = {};

  try {
    data = await response.json();
  } catch {
    // Response body might not be JSON
  }

  switch (response.status) {
    case 401:
      return new ApiError(
        401,
        'UNAUTHORIZED',
        `Authentication failed: ${data.error?.message || 'Invalid API key'}

Your API key may be invalid or expired.
Run /elite-skills:configure to set a new key.
Get keys at: https://skills.1shotlabs.com/dashboard/api-keys`
      );

    case 403:
      if (data.error?.code === 'SUBSCRIPTION_REQUIRED') {
        return new ApiError(
          403,
          'SUBSCRIPTION_REQUIRED',
          `Active subscription required to access Elite Skills.

Subscribe at: https://skills.1shotlabs.com/pricing`
        );
      }
      if (data.error?.code === 'MONTHLY_LIMIT_REACHED') {
        return new ApiError(
          403,
          'MONTHLY_LIMIT_REACHED',
          `Monthly request limit reached (${data.error?.used}/${data.error?.limit}).

Upgrade to Professional for unlimited requests:
https://skills.1shotlabs.com/pricing`
        );
      }
      return new ApiError(403, 'FORBIDDEN', data.error?.message || 'Access denied');

    case 404:
      return new ApiError(
        404,
        'NOT_FOUND',
        `Skill not found.

Browse available skills at: https://skills.1shotlabs.com/catalog
Or run /elite-skills:catalog to list all skills.`
      );

    case 429:
      const retryAfter = response.headers.get('Retry-After') || '60';
      return new ApiError(
        429,
        'RATE_LIMITED',
        `Too many requests. Please wait ${retryAfter} seconds.`
      );

    default:
      return new ApiError(
        response.status,
        'UNKNOWN',
        `API error: ${data.error?.message || response.statusText}`
      );
  }
}

/**
 * Fetch a skill by slug from the API
 * @param slug - The skill slug/identifier
 * @returns The skill markdown content
 * @throws ConfigurationError if API key not configured
 * @throws ApiError on API errors
 */
export async function fetchSkill(slug: string): Promise<string> {
  const apiKey = await getApiKey();

  if (!apiKey) {
    throw new ConfigurationError(
      `API key not configured.

To use Elite Skills, you need to configure your API key:

1. Get your API key from:
   https://skills.1shotlabs.com/dashboard/api-keys

2. Run /elite-skills:configure to set up your key`
    );
  }

  const response = await fetch(`${API_BASE_URL}/skills/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT,
    },
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }

  const data = await response.json();
  return data.data?.content || data.content || '';
}

/**
 * Fetch a skill with caching support
 * Uses ETag for conditional requests to minimize bandwidth
 * @param slug - The skill slug/identifier
 * @returns The skill content
 */
export async function fetchSkillWithCache(slug: string): Promise<SkillContent> {
  const apiKey = await getApiKey();

  if (!apiKey) {
    throw new ConfigurationError(
      `API key not configured. Run /elite-skills:configure`
    );
  }

  // Check for cached version
  const cache = await loadSkillCache(slug);
  const cachedEtag = await getSkillCacheEtag(slug);

  // Build headers for conditional request
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'User-Agent': USER_AGENT,
  };

  if (cachedEtag) {
    headers['If-None-Match'] = cachedEtag;
  }

  const response = await fetch(`${API_BASE_URL}/skills/${slug}`, {
    method: 'GET',
    headers,
  });

  // If we get a 304 Not Modified, return cached version
  if (response.status === 304 && cache) {
    return cache.skill;
  }

  if (!response.ok) {
    throw await handleApiError(response);
  }

  const data = await response.json();
  const skill: SkillContent = data.data || data;
  const etag = response.headers.get('ETag') || '';

  // Save to cache
  await saveSkillCache(slug, skill, etag);

  return skill;
}

/**
 * Test if an API key is valid
 * @param apiKey - The API key to test
 * @returns true if the key is valid
 */
export async function testApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch the skill catalog
 * @param apiKey - Optional API key (authenticated users get full catalog)
 * @returns Array of catalog items
 */
export async function fetchCatalog(apiKey?: string): Promise<SkillContent[]> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': USER_AGENT,
  };

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const response = await fetch(`${API_BASE_URL}/catalog`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }

  const data = await response.json();
  return data.data?.skills || data.skills || [];
}
