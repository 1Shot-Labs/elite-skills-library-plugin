# Installation Guide

This guide walks you through installing and configuring the Elite Skills Library plugin for Claude Code.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Step-by-Step Installation](#step-by-step-installation)
- [Getting Your API Key](#getting-your-api-key)
- [Configuring the Plugin](#configuring-the-plugin)
- [Verifying Installation](#verifying-installation)
- [Updating the Plugin](#updating-the-plugin)
- [Uninstalling](#uninstalling)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

## Prerequisites

### 1. Claude Code CLI

You need Claude Code installed and working on your system.

**Check if Claude Code is installed:**
```bash
claude --version
```

**Expected output:**
```
claude-code v1.x.x
```

If not installed, visit the [Claude Code documentation](https://docs.anthropic.com/claude-code) for installation instructions.

### 2. Account and Subscription

You need an account at [skills.1shotlabs.com](https://skills.1shotlabs.com):

1. Visit [skills.1shotlabs.com](https://skills.1shotlabs.com)
2. Click "Get Started" or "Sign Up"
3. Create an account using email or OAuth (Google/GitHub)
4. Choose a subscription plan:
   - **Free**: 100 requests/month, 1 API key
   - **Professional**: Unlimited requests, 5 API keys

### 3. Network Requirements

The plugin needs to connect to:
- `skills.1shotlabs.com` (HTTPS, port 443)

Ensure this domain is not blocked by your firewall or proxy.

## Step-by-Step Installation

### Step 1: Start Claude Code

Open your terminal and start Claude Code in your project directory:

```bash
cd /path/to/your/project
claude
```

### Step 2: Add the 1Shot Labs Marketplace

Within Claude Code, run:

```
/plugin marketplace add 1Shot-Labs/marketplace
```

**Expected output:**
```
Added marketplace: 1Shot-Labs/marketplace
Available plugins: elite-skills
```

### Step 3: Install the Plugin

Install the Elite Skills plugin:

```
/plugin install elite-skills@1shot
```

**Expected output:**
```
Installing elite-skills@1shot...
Plugin installed successfully: elite-skills v1.0.0
Run /elite-skills:configure to set up your API key
```

### Step 4: Configure Your API Key

Run the configure command:

```
/elite-skills:configure
```

When prompted, paste your API key (starts with `esk_`).

**Example:**
```
Enter your Elite Skills API key: esk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

API key configured successfully!
Subscription: Professional
Skills available: 273
```

## Getting Your API Key

### Step 1: Log In to Your Dashboard

1. Go to [skills.1shotlabs.com](https://skills.1shotlabs.com)
2. Click "Sign In"
3. Enter your credentials

### Step 2: Navigate to API Keys

1. Click on your profile or "Dashboard"
2. Select "API Keys" from the sidebar
3. Or go directly to: [skills.1shotlabs.com/dashboard/api-keys](https://skills.1shotlabs.com/dashboard/api-keys)

### Step 3: Create a New Key

1. Click "Create New Key"
2. Give it a descriptive name (e.g., "Work Laptop", "Personal MacBook")
3. Click "Create"

### Step 4: Copy Your Key

**Important:** The full key is only shown once. Copy it immediately!

- Keys start with `esk_`
- Keys are 68 characters long
- Example format: `esk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 5: Store Securely

If you need to store the key temporarily:
- Use a password manager
- Never commit to version control
- Never share in chat/email

## Configuring the Plugin

### Automatic Configuration

The easiest way to configure:

```
/elite-skills:configure
```

Paste your API key when prompted.

### Manual Configuration

Create the configuration file manually:

1. Create the directory (if it doesn't exist):
   ```bash
   mkdir -p .claude
   ```

2. Create `.claude/.elite-skills.local.md`:
   ```markdown
   ---
   api_key: esk_your_api_key_here
   ---
   ```

3. Add to `.gitignore` (if not already):
   ```
   .claude/*.local.md
   ```

### Configuration File Location

The config file is stored at:
```
your-project/
  .claude/
    .elite-skills.local.md    # Contains your API key
```

This location ensures:
- Project-specific configuration
- Automatic gitignore (most projects)
- Easy backup and migration

### Multiple Projects

Each project can have its own API key. The plugin reads the config from the current project's `.claude/` directory.

To use the same key across projects, you can:
1. Copy the config file to each project
2. Create a symlink (advanced)
3. Use environment variables (future feature)

## Verifying Installation

### Check Plugin Status

```
/plugin list
```

Look for `elite-skills` in the output:
```
Installed plugins:
  - elite-skills@1shot v1.0.0 (1Shot Labs)
```

### Check Configuration

```
/elite-skills:status
```

**Expected output:**
```
Elite Skills Status:
  API key configured
  Subscription: Professional
  Usage: 12/100 requests this month (Free) or Unlimited (Professional)
  Skills available: 273
  Rate limit: Healthy
```

### Test a Skill

Try a simple query that would trigger a skill:

```
What are the key principles of domain-driven design?
```

If working correctly, Claude will use the DDD skill to provide expert-level guidance.

## Updating the Plugin

### Check for Updates

```
/plugin update elite-skills@1shot
```

### Force Reinstall

If you're having issues:

```
/plugin uninstall elite-skills@1shot
/plugin install elite-skills@1shot
```

Your API key configuration will be preserved (it's stored separately).

## Uninstalling

### Remove the Plugin

```
/plugin uninstall elite-skills@1shot
```

### Remove Configuration (Optional)

Delete the config file if you want to remove all traces:

```bash
rm .claude/.elite-skills.local.md
```

### Remove Marketplace (Optional)

If you don't need other 1Shot Labs plugins:

```
/plugin marketplace remove 1Shot-Labs/marketplace
```

## Troubleshooting

### "Command not found: /plugin"

**Cause:** Claude Code doesn't recognize plugin commands.

**Solutions:**
1. Ensure you're running Claude Code (not regular Claude)
2. Update Claude Code to the latest version
3. Restart Claude Code

### "Marketplace not found"

**Cause:** The marketplace hasn't been added.

**Solution:**
```
/plugin marketplace add 1Shot-Labs/marketplace
```

### "Plugin not found: elite-skills@1shot"

**Cause:** Plugin not available or marketplace not added.

**Solutions:**
1. Verify marketplace is added: `/plugin marketplace list`
2. Check internet connection
3. Try: `/plugin search elite-skills`

### "Invalid API key"

**Cause:** The API key is incorrect or revoked.

**Solutions:**
1. Verify key at [skills.1shotlabs.com/dashboard/api-keys](https://skills.1shotlabs.com/dashboard/api-keys)
2. Check for typos (copy-paste is recommended)
3. Ensure key starts with `esk_`
4. Generate a new key if needed

### "API key not configured"

**Cause:** No API key has been set up.

**Solution:**
```
/elite-skills:configure
```

### "Rate limit exceeded"

**Cause:** You've exceeded your monthly request limit.

**Solutions:**
- Wait until next billing cycle (resets monthly)
- Upgrade to Professional plan for unlimited requests
- Check usage: `/elite-skills:status`

### "Network error" or "Connection timeout"

**Cause:** Cannot reach the Elite Skills API.

**Solutions:**
1. Check internet connection
2. Verify [skills.1shotlabs.com](https://skills.1shotlabs.com) is accessible in browser
3. Check firewall/proxy settings
4. Try again in a few minutes

### "Subscription expired"

**Cause:** Your subscription has lapsed.

**Solution:**
1. Visit [skills.1shotlabs.com/dashboard](https://skills.1shotlabs.com/dashboard)
2. Update payment method
3. Renew subscription

### Config File Issues

**Symptoms:** API key not recognized even after configuration.

**Solutions:**
1. Check file location: `.claude/.elite-skills.local.md`
2. Verify YAML frontmatter format:
   ```markdown
   ---
   api_key: esk_your_key_here
   ---
   ```
3. Ensure no extra spaces or characters
4. Check file permissions

## FAQ

### Q: Is the Free plan really free?

**A:** Yes! The Free plan gives you:
- 1 API key
- 100 requests per month
- Access to all 270+ skills
- No credit card required

### Q: What counts as a "request"?

**A:** Each time the plugin fetches a skill from the API counts as one request. Skills are cached, so repeated uses of the same skill in a session don't count multiple times.

### Q: Can I use the same API key on multiple machines?

**A:** Yes, but we recommend creating separate keys for each machine for better tracking and security. Professional plan includes 5 keys.

### Q: Will my API key be visible to Claude?

**A:** The API key is used for authentication but is not exposed to Claude's context. It's stored securely in your local configuration file.

### Q: What happens if I exceed my rate limit?

**A:** Skill requests will fail until your limit resets (monthly) or you upgrade. Claude will still work, just without Elite Skills enhancements.

### Q: Can I use this in CI/CD pipelines?

**A:** The plugin is designed for interactive Claude Code sessions. For CI/CD, consider using the API directly. Contact support for enterprise options.

### Q: How do I request a new skill?

**A:** We love suggestions! Open an issue at [github.com/1Shot-Labs/elite-skills-library-plugin/issues](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues) with the "skill request" label.

### Q: Is my code sent to your servers?

**A:** No. The plugin only sends skill identifiers. Your code, queries, and Claude responses never leave your machine (except to Anthropic as part of normal Claude Code operation).

### Q: Can I use this offline?

**A:** Skills need to be fetched from the API, so an internet connection is required. However, recently used skills may be cached for a short period.

---

Need more help? [Open an issue](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues) or email support@1shotlabs.com
