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

---

## Implementation

When this command is invoked, follow these steps:

### Step 1: Prompt for API Key

Ask the user:
```
Please enter your Elite Skills API key.

You can get your API key from: https://skills.1shotlabs.com/dashboard/api-keys

API key (starts with esk_):
```

### Step 2: Validate Format

```typescript
import { validateApiKeyFormat, validateApiKeyFormatDetailed } from '../lib/config';

// Simple check
if (!validateApiKeyFormat(userInput)) {
  console.error('Invalid API key format');
  return;
}

// Or with detailed error message
const validation = validateApiKeyFormatDetailed(userInput);
if (!validation.valid) {
  console.error(`Invalid API key format: ${validation.error}`);
  console.log('\nAPI keys must:');
  console.log('  - Start with "esk_"');
  console.log('  - Be exactly 68 characters long');
  return;
}
```

### Step 3: Test API Key

```typescript
import { testApiKey } from '../lib/api-client';

console.log('Testing API key...');
const isValid = await testApiKey(apiKey);
if (!isValid) {
  console.error('API key validation failed');
  console.log('\nPlease verify your API key at:');
  console.log('https://skills.1shotlabs.com/dashboard/api-keys');
  return;
}
```

### Step 4: Save Configuration

```typescript
import { saveApiKey } from '../lib/config';

try {
  await saveApiKey(apiKey);
  console.log('\n✓ Elite Skills configured successfully!');
  console.log('\nYour API key has been saved to:');
  console.log('  .claude/.elite-skills.local.md');
  console.log('\nYou can now use Elite Skills. Try /elite-skills:status to check your subscription.');
} catch (error) {
  console.error(`Failed to save configuration: ${error.message}`);
}
```

### Complete Implementation Example

```typescript
import { validateApiKeyFormat, saveApiKey, configExists } from '../lib/config';
import { testApiKey } from '../lib/api-client';

async function configure() {
  // Check if already configured
  if (await configExists()) {
    console.log('Elite Skills is already configured.');
    console.log('Do you want to reconfigure? (y/n)');
    // If no, exit early
  }

  // Prompt user for API key
  const apiKey = await promptUser('Enter your API key (starts with esk_):');

  // Step 1: Validate format
  if (!validateApiKeyFormat(apiKey)) {
    console.error('\n✗ Invalid API key format');
    console.log('\nAPI key format requirements:');
    console.log('  - Must start with "esk_"');
    console.log('  - Must be exactly 68 characters');
    console.log('\nGet your API key at: https://skills.1shotlabs.com/dashboard/api-keys');
    return;
  }

  // Step 2: Test against API
  console.log('\nVerifying API key...');
  const isValid = await testApiKey(apiKey);
  if (!isValid) {
    console.error('\n✗ API key verification failed');
    console.log('\nPossible causes:');
    console.log('  - API key was revoked');
    console.log('  - Subscription has expired');
    console.log('  - Network connectivity issues');
    console.log('\nVerify at: https://skills.1shotlabs.com/dashboard/api-keys');
    return;
  }

  // Step 3: Save configuration
  try {
    await saveApiKey(apiKey);
    console.log('\n✓ Elite Skills configured successfully!');
    console.log('\nConfiguration saved to: .claude/.elite-skills.local.md');
    console.log('\nNext steps:');
    console.log('  - Run /elite-skills:status to check your subscription');
    console.log('  - Browse available skills in the catalog');
  } catch (error) {
    console.error(`\n✗ ${error.message}`);
  }
}
```

### Error Messages

| Scenario | Message |
|----------|---------|
| Empty input | "API key is required" |
| Wrong prefix | "API key must start with 'esk_'" |
| Wrong length | "API key must be 68 characters (got X)" |
| Auth failed | "Invalid API key - authentication failed" |
| Key revoked | "API key is revoked or expired" |
| Network error | "Network error: Unable to connect to API" |
| Save failed | "Failed to save config: [details]" |

### Security Notes

- API keys are stored locally in the project directory
- The config file should be added to .gitignore
- Never commit API keys to version control
- Keys can be rotated at skills.1shotlabs.com/dashboard/api-keys
