---
description: Configure your Elite Skills API key
---

# Configure Elite Skills API Key

To use Elite Skills, you need an API key from your subscription.

## Getting Your API Key

1. Visit [skills.1shotlabs.com/dashboard/api-keys](https://skills.1shotlabs.com/dashboard/api-keys)
2. Click "Create New Key"
3. Copy the API key (starts with `esk_`)

## Configuration

Your API key will be saved to `.claude/.elite-skills.local.md` in your project directory. This file is automatically gitignored and project-scoped.

## API Key Format

Elite Skills API keys:
- Start with `esk_`
- Are 68 characters long
- Example: `esk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Subscription Plans

- **Free:** 1 API key, 100 requests/month
- **Professional:** 5 API keys, unlimited requests

Upgrade at [skills.1shotlabs.com/pricing](https://skills.1shotlabs.com/pricing)
