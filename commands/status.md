---
description: Check Elite Skills subscription and usage status
---

# Elite Skills Status

Check your current subscription status, API key configuration, and usage metrics.

## What This Command Shows

- API key configuration status
- Subscription plan (Free or Professional)
- Monthly request usage and limits
- Total available skills
- Last sync timestamp

## Example Output

```
Elite Skills Status:
✓ API key configured
✓ Subscription: Free
✓ Usage: 45/100 requests this month
✓ Skills available: 273
✓ Rate limit: Healthy

Next billing: February 1, 2026
```

## Troubleshooting

If you see "Not configured", run:
```bash
/elite-skills:configure
```

If you see "Invalid API key", verify your key at:
[skills.1shotlabs.com/dashboard/api-keys](https://skills.1shotlabs.com/dashboard/api-keys)
