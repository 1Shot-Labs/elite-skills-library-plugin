---
description: Configure your Elite Skills API key for authenticated access
---

# Configure Elite Skills API Key

Set up or update your API key to access the Elite Skills Library.

## Overview

This command configures your API key for the Elite Skills Library plugin. The key is stored locally in your project and is never committed to version control.

## Usage

```
/elite-skills:configure
```

When prompted, enter your API key (starts with `esk_`).

## Getting Your API Key

### Step 1: Sign Up or Log In

Visit [skills.1shotlabs.com](https://skills.1shotlabs.com) and create an account or log in.

### Step 2: Navigate to API Keys

Go to **Dashboard** > **API Keys** or visit directly:
[skills.1shotlabs.com/dashboard/api-keys](https://skills.1shotlabs.com/dashboard/api-keys)

### Step 3: Create a New Key

1. Click **"Create New Key"**
2. Give it a descriptive name (e.g., "Work Laptop")
3. Click **"Create"**

### Step 4: Copy the Key

**Important:** The full key is only shown once!

- Copy it immediately after creation
- Keys start with `esk_`
- Keys are 68 characters long

## API Key Format

Valid API keys:
- **Prefix:** `esk_` (Elite Skills Key)
- **Length:** 68 characters total
- **Characters:** Alphanumeric with underscores
- **Example:** `esk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8`

## Configuration Storage

Your API key is stored at:

```
your-project/
  .claude/
    .elite-skills.local.md
```

### File Format

```markdown
---
api_key: esk_your_api_key_here
---
```

### Security

- The file is automatically gitignored (pattern: `*.local.md`)
- Never commit API keys to version control
- Each project can have its own key

## Examples

### Successful Configuration

```
> /elite-skills:configure

Enter your Elite Skills API key: esk_live_xxxxxxxxxxxx...

API key configured successfully!

Subscription: Professional
Skills Available: 273
Monthly Usage: 45 requests
Status: Active
```

### Updating an Existing Key

```
> /elite-skills:configure

Current key: esk_live_xxxx...xxxx (configured)
Enter new API key (or press Enter to keep current): esk_live_yyyy...

API key updated successfully!
```

### Removing Configuration

To remove your API key:

```bash
rm .claude/.elite-skills.local.md
```

Then reconfigure when needed with `/elite-skills:configure`.

## Error Scenarios

### Invalid API Key Format

```
> /elite-skills:configure
Enter your Elite Skills API key: invalid_key_here

Error: Invalid API key format
API keys must start with 'esk_' and be 68 characters long.

Get your API key at: https://skills.1shotlabs.com/dashboard/api-keys
```

**Solution:** Ensure you're copying the complete key that starts with `esk_`.

### API Key Not Found

```
> /elite-skills:configure
Enter your Elite Skills API key: esk_live_xxxx...

Error: API key not found
This key doesn't exist or may have been revoked.

Verify your key at: https://skills.1shotlabs.com/dashboard/api-keys
```

**Solution:** Check your dashboard to ensure the key exists and hasn't been deleted.

### Expired Subscription

```
> /elite-skills:configure
Enter your Elite Skills API key: esk_live_xxxx...

Warning: Subscription expired
Your subscription expired on January 15, 2026.

Renew at: https://skills.1shotlabs.com/dashboard/billing
```

**Solution:** Renew your subscription to continue using Elite Skills.

### Network Error

```
> /elite-skills:configure
Enter your Elite Skills API key: esk_live_xxxx...

Error: Could not connect to Elite Skills API
Please check your internet connection and try again.
```

**Solution:**
1. Check your internet connection
2. Verify [skills.1shotlabs.com](https://skills.1shotlabs.com) is accessible
3. Check firewall/proxy settings

### Permission Denied

```
> /elite-skills:configure

Error: Cannot write configuration file
Permission denied: .claude/.elite-skills.local.md
```

**Solution:**
1. Check directory permissions
2. Ensure `.claude/` directory exists
3. Run `mkdir -p .claude` if needed

## Subscription Plans

| Plan | API Keys | Monthly Requests | Price |
|------|----------|------------------|-------|
| Free | 1 | 100 | $0 |
| Professional | 5 | Unlimited | $29/month |

Upgrade at [skills.1shotlabs.com/pricing](https://skills.1shotlabs.com/pricing)

## Related Commands

- `/elite-skills:status` - Check your current subscription and usage

## Need Help?

- [Installation Guide](../INSTALLATION.md)
- [Documentation](https://skills.1shotlabs.com/docs)
- [Support](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues)
