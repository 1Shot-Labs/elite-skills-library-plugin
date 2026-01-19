---
description: Check Elite Skills subscription status, usage metrics, and configuration
---

# Elite Skills Status

View your current subscription status, API key configuration, usage metrics, and system health.

## Overview

This command provides a comprehensive overview of your Elite Skills account and plugin configuration. Use it to:

- Verify your API key is configured correctly
- Check your subscription plan and status
- Monitor monthly usage against your limits
- View available skills count
- Check API connection health

## Usage

```
/elite-skills:status
```

No arguments required. The command reads your local configuration and queries the Elite Skills API.

## Output Explained

### Example: Professional Plan (Healthy)

```
Elite Skills Status
===================

Configuration
  API Key:         esk_live_xxxx...xxxx (configured)
  Config Location: .claude/.elite-skills.local.md
  Last Validated:  2 minutes ago

Subscription
  Plan:            Professional
  Status:          Active
  Billing Cycle:   Monthly
  Next Renewal:    February 1, 2026

Usage (January 2026)
  Requests Used:   247
  Requests Limit:  Unlimited
  API Keys Used:   2 of 5

Skills Library
  Total Skills:    273
  Categories:      24
  Last Updated:    January 18, 2026

System Health
  API Connection:  Healthy
  Response Time:   145ms
  Rate Limit:      OK
```

### Example: Free Plan (Near Limit)

```
Elite Skills Status
===================

Configuration
  API Key:         esk_live_xxxx...xxxx (configured)
  Config Location: .claude/.elite-skills.local.md
  Last Validated:  Just now

Subscription
  Plan:            Free
  Status:          Active
  Billing Cycle:   Monthly
  Next Reset:      February 1, 2026

Usage (January 2026)
  Requests Used:   89 of 100 (89%)
  Remaining:       11 requests
  API Keys Used:   1 of 1

  [!] Approaching monthly limit - consider upgrading
      Upgrade at: https://skills.1shotlabs.com/pricing

Skills Library
  Total Skills:    273
  Categories:      24
  Last Updated:    January 18, 2026

System Health
  API Connection:  Healthy
  Response Time:   132ms
  Rate Limit:      OK
```

## Status Fields

### Configuration Section

| Field | Description |
|-------|-------------|
| API Key | Masked view of your configured key |
| Config Location | Path to your local config file |
| Last Validated | When the key was last verified with the API |

### Subscription Section

| Field | Description |
|-------|-------------|
| Plan | Current plan (Free or Professional) |
| Status | Active, Expired, or Cancelled |
| Billing Cycle | Monthly billing period |
| Next Renewal/Reset | When usage resets or subscription renews |

### Usage Section

| Field | Description |
|-------|-------------|
| Requests Used | API calls made this billing period |
| Requests Limit | Maximum allowed (100 for Free, Unlimited for Pro) |
| Remaining | Requests left until limit (Free plan only) |
| API Keys Used | Active keys out of total allowed |

### Skills Library Section

| Field | Description |
|-------|-------------|
| Total Skills | Number of skills available |
| Categories | Number of skill categories |
| Last Updated | When the skills catalog was last updated |

### System Health Section

| Field | Description |
|-------|-------------|
| API Connection | Connection status to Elite Skills API |
| Response Time | Latency to the API server |
| Rate Limit | Whether you're within rate limits |

## Examples

### Checking Before Heavy Usage

Before starting a big project, check your status:

```
> /elite-skills:status

Usage (January 2026)
  Requests Used:   45 of 100 (45%)
  Remaining:       55 requests

You have 55 requests remaining for this month.
```

### After Upgrading

Verify your upgrade was applied:

```
> /elite-skills:status

Subscription
  Plan:            Professional  (upgraded from Free)
  Status:          Active

Usage (January 2026)
  Requests Used:   45
  Requests Limit:  Unlimited

Your upgrade to Professional is now active!
```

### Verifying New API Key

After configuring a new key:

```
> /elite-skills:status

Configuration
  API Key:         esk_live_yyyy...yyyy (configured)
  Last Validated:  Just now

Status: API key is valid and active.
```

## Error Scenarios

### Not Configured

```
> /elite-skills:status

Elite Skills Status
===================

Configuration
  API Key:         Not configured

To configure your API key, run:
  /elite-skills:configure

Get your API key at: https://skills.1shotlabs.com/dashboard/api-keys
```

**Solution:** Run `/elite-skills:configure` with your API key.

### Invalid API Key

```
> /elite-skills:status

Elite Skills Status
===================

Configuration
  API Key:         esk_live_xxxx...xxxx (invalid)

Error: API key is not valid
The configured key was not recognized by the Elite Skills API.
This key may have been revoked or never existed.

Solutions:
  1. Verify your key at: https://skills.1shotlabs.com/dashboard/api-keys
  2. Run /elite-skills:configure with a valid key
```

**Solution:** Check your dashboard and reconfigure with a valid key.

### Rate Limit Exceeded

```
> /elite-skills:status

Elite Skills Status
===================

Usage (January 2026)
  Requests Used:   100 of 100 (100%)
  Remaining:       0 requests

  [!] Monthly limit reached

  Your Free plan limit has been reached for this month.
  Skills will not load until your usage resets on February 1, 2026.

  Options:
    - Wait for monthly reset (13 days)
    - Upgrade to Professional for unlimited requests:
      https://skills.1shotlabs.com/pricing
```

**Solution:** Wait for reset or upgrade to Professional.

### Subscription Expired

```
> /elite-skills:status

Elite Skills Status
===================

Subscription
  Plan:            Professional
  Status:          Expired (January 15, 2026)

  [!] Your subscription has expired

  Skills are no longer accessible. To restore access:
    1. Update payment method: https://skills.1shotlabs.com/dashboard/billing
    2. Or downgrade to Free plan (100 requests/month)
```

**Solution:** Update billing information or renew subscription.

### Network Error

```
> /elite-skills:status

Elite Skills Status
===================

Configuration
  API Key:         esk_live_xxxx...xxxx (configured)

System Health
  API Connection:  Failed
  Error:           Could not connect to skills.1shotlabs.com

  Unable to verify subscription status.

  Troubleshooting:
    1. Check your internet connection
    2. Verify https://skills.1shotlabs.com is accessible
    3. Check firewall/proxy settings
    4. Try again in a few moments
```

**Solution:** Check network connectivity and retry.

### Slow Response

```
> /elite-skills:status

System Health
  API Connection:  Healthy
  Response Time:   2.3s (slow)

  [!] API response time is higher than normal
  This may affect skill loading performance.
```

**Note:** Temporary slowness is usually resolved quickly. If persistent, check [status.1shotlabs.com](https://status.1shotlabs.com).

## Interpreting Health Status

| Status | Meaning | Action |
|--------|---------|--------|
| Healthy | Everything working normally | None needed |
| Slow | Higher than normal latency | Monitor, usually temporary |
| Degraded | Partial service issues | Check status page |
| Failed | Cannot connect | Check network, retry |

## Usage Tips

### Monitor Before Month End

Check your usage regularly if on the Free plan:

```
> /elite-skills:status
```

### Verify After Changes

Run status after:
- Configuring a new API key
- Upgrading your subscription
- Creating or revoking API keys

### Troubleshooting First Step

When skills aren't loading, always check status first:

```
> /elite-skills:status
```

This helps identify if the issue is:
- Configuration (API key)
- Subscription (expired/limits)
- Network (connectivity)

## Related Commands

- `/elite-skills:configure` - Set up or update your API key

## Links

- [Dashboard](https://skills.1shotlabs.com/dashboard) - Manage account
- [API Keys](https://skills.1shotlabs.com/dashboard/api-keys) - Manage keys
- [Billing](https://skills.1shotlabs.com/dashboard/billing) - Payment settings
- [Pricing](https://skills.1shotlabs.com/pricing) - Plan comparison
- [Status Page](https://status.1shotlabs.com) - Service status

## Need Help?

- [Installation Guide](../INSTALLATION.md)
- [Troubleshooting](../README.md#troubleshooting)
- [Support](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues)

---

## Implementation

When this command is invoked, follow these steps:

### Step 1: Check Configuration

```typescript
import { getApiKey, isConfigured } from '../lib/config';

if (!isConfigured()) {
  console.log('✗ Elite Skills is not configured.\n');
  console.log('Run /elite-skills:configure to set up your API key.');
  return;
}

const apiKey = await getApiKey();
```

### Step 2: Fetch Subscription Status

```typescript
import { getSubscriptionStatus, formatStatusDisplay, formatErrorDisplay } from '../lib/status';

console.log('Fetching status...\n');

const result = await getSubscriptionStatus(apiKey);

if (!result.success) {
  console.log(formatErrorDisplay(result.error));
  return;
}

console.log(formatStatusDisplay(result.data));
```

### Complete Implementation Example

```typescript
import { getApiKey, isConfigured } from '../lib/config';
import {
  getSubscriptionStatus,
  formatStatusDisplay,
  formatErrorDisplay,
  SubscriptionStatus
} from '../lib/status';

async function status() {
  // Step 1: Check if configured
  if (!isConfigured()) {
    console.log('✗ Elite Skills is not configured.\n');
    console.log('To get started:');
    console.log('  1. Get an API key at https://skills.1shotlabs.com/dashboard/api-keys');
    console.log('  2. Run /elite-skills:configure');
    return;
  }

  const apiKey = await getApiKey();
  if (!apiKey) {
    console.log('✗ Could not read API key from configuration.\n');
    console.log('Try running /elite-skills:configure again.');
    return;
  }

  // Step 2: Fetch status from API
  console.log('Fetching subscription status...\n');

  const result = await getSubscriptionStatus(apiKey);

  if (!result.success) {
    console.log(formatErrorDisplay(result.error));
    return;
  }

  // Step 3: Display status
  console.log(formatStatusDisplay(result.data));

  // Step 4: Show warnings if needed
  showWarnings(result.data);
}

function showWarnings(status: SubscriptionStatus) {
  const warnings: string[] = [];

  // Usage warning
  if (status.usage.percentUsed >= 90) {
    warnings.push('⚠ You are approaching your monthly request limit.');
  }

  // Rate limit warning
  if (status.rateLimit.status === 'warning') {
    warnings.push('⚠ Rate limit is running low. Consider slowing down requests.');
  } else if (status.rateLimit.status === 'exceeded') {
    warnings.push('✗ Rate limit exceeded. Requests will be blocked until reset.');
  }

  // Billing warning
  if (status.billing.status === 'past_due') {
    warnings.push('⚠ Payment is past due. Update billing at skills.1shotlabs.com/dashboard');
  } else if (status.billing.status === 'canceled') {
    warnings.push('✗ Subscription canceled. Renew at skills.1shotlabs.com/pricing');
  }

  if (warnings.length > 0) {
    console.log('\n' + warnings.join('\n'));
  }
}
```

### Output Formatting

The status display uses Unicode symbols for cross-platform compatibility:

| Symbol | Meaning |
|--------|---------|
| ✓ | Success/Healthy |
| ✗ | Error/Problem |
| ⚠ | Warning |

### Status Response Fields

```typescript
interface SubscriptionStatus {
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
```

### Error Handling

| Error Code | Display Message |
|------------|-----------------|
| NOT_CONFIGURED | "Elite Skills is not configured. Run /elite-skills:configure to set up." |
| INVALID_KEY | "Invalid API key. Verify at skills.1shotlabs.com/dashboard/api-keys" |
| NETWORK_ERROR | "Failed to connect to API: [details]" |
| API_ERROR | "API returned error: [details]" |

### Helpful Suggestions

When displaying errors, include actionable suggestions:

**Not Configured:**
```
✗ Elite Skills is not configured.

To get started:
  1. Get an API key at https://skills.1shotlabs.com/dashboard/api-keys
  2. Run /elite-skills:configure
```

**Invalid Key:**
```
✗ Invalid API key.

Your API key may have been revoked or is incorrect.
Verify at: https://skills.1shotlabs.com/dashboard/api-keys
```

**Network Error:**
```
✗ Network error.

Failed to connect to API: [error details]

Check your internet connection and try again.
```

**Usage Limit Warning:**
```
Elite Skills Status:

✓ API key configured
✓ Subscription: Free
⚠ Usage: 95/100 requests this month (95%)
✓ Skills available: 273
✓ Rate limit: Healthy

⚠ You are approaching your monthly request limit.
Consider upgrading at: https://skills.1shotlabs.com/pricing
```
