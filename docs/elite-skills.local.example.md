# Elite Skills Local Configuration Example

This file shows the proper format for `.claude/.elite-skills.local.md`.

## File Location

Create this file at:
```
your-project/
  .claude/
    .elite-skills.local.md    <-- Your actual config file
```

## Configuration Format

The configuration uses YAML frontmatter (content between `---` markers).

### Basic Configuration

```markdown
---
# Elite Skills Library Configuration
# This file stores your API key for the Elite Skills plugin
# DO NOT commit this file to version control!

api_key: esk_live_your_api_key_here
---
```

### Minimal Configuration

The minimum required configuration:

```markdown
---
api_key: esk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
---
```

## Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `api_key` | Yes | Your Elite Skills API key (starts with `esk_`) |

## Important Notes

### Security

1. **Never commit this file** - It contains your API key
2. **Gitignore pattern** - Add `*.local.md` to `.gitignore`
3. **One key per project** - Each project can have its own key

### File Permissions

Ensure the file is readable only by you:

```bash
chmod 600 .claude/.elite-skills.local.md
```

### Validation

After creating the file, verify it works:

```
/elite-skills:status
```

## Getting Your API Key

1. Visit [skills.1shotlabs.com/dashboard/api-keys](https://skills.1shotlabs.com/dashboard/api-keys)
2. Click "Create New Key"
3. Copy the key immediately (only shown once)
4. Paste into the configuration file

## Setup Instructions

### Step 1: Create the Directory

```bash
mkdir -p .claude
```

### Step 2: Create the Configuration File

```bash
cat > .claude/.elite-skills.local.md << 'EOF'
---
api_key: YOUR_API_KEY_HERE
---
EOF
```

Replace `YOUR_API_KEY_HERE` with your actual API key.

### Step 3: Verify Gitignore

Ensure `.gitignore` includes:

```
.claude/*.local.md
```

### Step 4: Test Configuration

In Claude Code:

```
/elite-skills:status
```

## Troubleshooting

### "API key not configured"

- Ensure file exists at `.claude/.elite-skills.local.md`
- Check YAML frontmatter syntax (must have `---` markers)
- Verify `api_key:` field name is correct

### "Invalid API key"

- Verify key starts with `esk_`
- Ensure no extra spaces or newlines around the key
- Check key hasn't been revoked in dashboard

### Syntax Errors

Common YAML issues:

```markdown
# WRONG: Missing quotes around key with special characters
---
api_key: esk_live_abc:123  # Colon can cause issues
---

# CORRECT: Quote if your key has special characters
---
api_key: "esk_live_abc:123"
---
```

## Example Complete File

Here's a complete, working example (with placeholder key):

```markdown
---
# Elite Skills Library Configuration
#
# This file is automatically gitignored.
# Get your API key at: https://skills.1shotlabs.com/dashboard/api-keys
#
# DO NOT share this key or commit it to version control!

api_key: esk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8
---

<!--
This is a local configuration file for the Elite Skills Library plugin.
See: https://github.com/1Shot-Labs/elite-skills-library-plugin

Commands:
  /elite-skills:configure - Update this configuration
  /elite-skills:status    - Check subscription status
-->
```

---

For more information, see the [Installation Guide](../INSTALLATION.md).
