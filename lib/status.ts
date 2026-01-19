/**
 * Elite Skills Library - Status and Subscription Management
 *
 * Handles fetching subscription status, usage metrics, and available skills.
 */

import { API_BASE_URL } from './config';

// Types
export interface SubscriptionStatus {
  isValid: boolean;
  plan: 'free' | 'professional' | 'enterprise';
  planDisplayName: string;
  usage: {
    requestsUsed: number;
    requestsLimit: number;
    percentUsed: number;
  };
  billing: {
    nextBillingDate: string | null;
    status: 'active' | 'canceled' | 'past_due' | 'trialing';
  };
  skills: {
    totalAvailable: number;
    categories: number;
  };
  apiKey: {
    isActive: boolean;
    createdAt: string;
    lastUsedAt: string | null;
  };
  rateLimit: {
    remaining: number;
    resetAt: string;
    status: 'healthy' | 'warning' | 'exceeded';
  };
}

export interface StatusError {
  code: 'NOT_CONFIGURED' | 'INVALID_KEY' | 'NETWORK_ERROR' | 'API_ERROR';
  message: string;
}

const USER_AGENT = 'EliteSkillsPlugin/1.0';

/**
 * Fetch subscription status from the API
 */
export async function getSubscriptionStatus(
  apiKey: string
): Promise<{ success: true; data: SubscriptionStatus } | { success: false; error: StatusError }> {
  if (!apiKey) {
    return {
      success: false,
      error: {
        code: 'NOT_CONFIGURED',
        message: 'API key is not configured. Run /elite-skills:configure to set up.'
      }
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          error: {
            code: 'INVALID_KEY',
            message: 'API key is invalid or has been revoked. Verify at skills.1shotlabs.com/dashboard/api-keys'
          }
        };
      }

      return {
        success: false,
        error: {
          code: 'API_ERROR',
          message: `API returned error: ${response.status} ${response.statusText}`
        }
      };
    }

    const data = await response.json();

    // Transform API response to SubscriptionStatus format
    const status: SubscriptionStatus = {
      isValid: true,
      plan: data.subscription?.plan || 'free',
      planDisplayName: formatPlanName(data.subscription?.plan || 'free'),
      usage: {
        requestsUsed: data.usage?.requests_used || 0,
        requestsLimit: data.usage?.requests_limit || 100,
        percentUsed: calculatePercentage(
          data.usage?.requests_used || 0,
          data.usage?.requests_limit || 100
        ),
      },
      billing: {
        nextBillingDate: data.subscription?.next_billing_date || null,
        status: data.subscription?.status || 'active',
      },
      skills: {
        totalAvailable: data.skills?.total || 0,
        categories: data.skills?.categories || 0,
      },
      apiKey: {
        isActive: data.api_key?.is_active ?? true,
        createdAt: data.api_key?.created_at || new Date().toISOString(),
        lastUsedAt: data.api_key?.last_used_at || null,
      },
      rateLimit: {
        remaining: data.rate_limit?.remaining || 100,
        resetAt: data.rate_limit?.reset_at || new Date().toISOString(),
        status: getRateLimitStatus(data.rate_limit?.remaining || 100, data.rate_limit?.limit || 100),
      },
    };

    return { success: true, data: status };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: `Failed to connect to API: ${error instanceof Error ? error.message : 'unknown error'}`
      }
    };
  }
}

/**
 * Format plan name for display
 */
function formatPlanName(plan: string): string {
  const planNames: Record<string, string> = {
    free: 'Free',
    professional: 'Professional',
    enterprise: 'Enterprise',
  };
  return planNames[plan] || plan.charAt(0).toUpperCase() + plan.slice(1);
}

/**
 * Calculate usage percentage
 */
function calculatePercentage(used: number, limit: number): number {
  if (limit === 0) return 0;
  return Math.round((used / limit) * 100);
}

/**
 * Determine rate limit status
 */
function getRateLimitStatus(remaining: number, limit: number): 'healthy' | 'warning' | 'exceeded' {
  const percentRemaining = (remaining / limit) * 100;
  if (percentRemaining <= 0) return 'exceeded';
  if (percentRemaining <= 20) return 'warning';
  return 'healthy';
}

/**
 * Format status for CLI display
 */
export function formatStatusDisplay(status: SubscriptionStatus): string {
  const checkMark = '\u2713'; // Unicode checkmark
  const crossMark = '\u2717'; // Unicode cross

  const lines: string[] = [
    'Elite Skills Status:',
    '',
    `${checkMark} API key configured`,
    `${checkMark} Subscription: ${status.planDisplayName}`,
    `${checkMark} Usage: ${status.usage.requestsUsed}/${status.usage.requestsLimit} requests this month (${status.usage.percentUsed}%)`,
    `${checkMark} Skills available: ${status.skills.totalAvailable}`,
    `${status.rateLimit.status === 'healthy' ? checkMark : crossMark} Rate limit: ${status.rateLimit.status.charAt(0).toUpperCase() + status.rateLimit.status.slice(1)}`,
  ];

  if (status.billing.nextBillingDate) {
    const billingDate = new Date(status.billing.nextBillingDate);
    lines.push('');
    lines.push(`Next billing: ${billingDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
  }

  return lines.join('\n');
}

/**
 * Format error for CLI display
 */
export function formatErrorDisplay(error: StatusError): string {
  const crossMark = '\u2717';

  switch (error.code) {
    case 'NOT_CONFIGURED':
      return `${crossMark} Elite Skills is not configured.\n\nRun /elite-skills:configure to set up your API key.`;

    case 'INVALID_KEY':
      return `${crossMark} Invalid API key.\n\nYour API key may have been revoked or is incorrect.\nVerify at: https://skills.1shotlabs.com/dashboard/api-keys`;

    case 'NETWORK_ERROR':
      return `${crossMark} Network error.\n\n${error.message}\n\nCheck your internet connection and try again.`;

    case 'API_ERROR':
      return `${crossMark} API error.\n\n${error.message}\n\nIf this persists, contact support@1shotlabs.com`;

    default:
      return `${crossMark} Unknown error: ${error.message}`;
  }
}
