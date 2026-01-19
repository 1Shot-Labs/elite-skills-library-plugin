/**
 * Type definitions for the Elite Skills Plugin
 */

export interface SkillConfig {
  api_key: string;
  key_name?: string;
  configured_at?: string;
}

export interface SkillContent {
  slug: string;
  name: string;
  description: string;
  content: string;
  version: number;
  category?: string;
  tags?: string[];
}

export interface SkillCache {
  skill: SkillContent;
  version: number;
  etag: string;
  cachedAt: number;
}

export interface CatalogCache {
  skills: SkillCatalogItem[];
  fetchedAt: number;
  ttl: number;
}

export interface SkillCatalogItem {
  slug: string;
  name: string;
  description: string;
  category?: string;
  tags?: string[];
}

export interface ApiErrorResponse {
  error?: {
    code?: string;
    message?: string;
    used?: number;
    limit?: number;
  };
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}
