# Elite Skills Library Plugin

Premium Claude Code skills via subscription. Access 270+ professional-grade skills that transform Claude into a domain expert.

## Installation

### Step 1: Add 1Shot Labs Marketplace

```bash
/plugin marketplace add 1Shot-Labs/marketplace
```

### Step 2: Install Plugin

```bash
/plugin install elite-skills@1shot
```

The plugin will prompt you for your API key on first use.

## Getting Your API Key

1. Sign up at [skills.1shotlabs.com](https://skills.1shotlabs.com)
2. Navigate to Dashboard → API Keys
3. Create a new API key
4. Copy the key (starts with `esk_`)

## Configuration

The plugin will automatically prompt for your API key when you first use a skill. Alternatively, you can configure manually:

```bash
/elite-skills:configure
```

Your API key is securely stored in `.claude/.elite-skills.local.md` (gitignored).

## Usage

Skills automatically load when Claude determines they're needed. Just ask Claude questions normally:

**Example:**
```
You: "Help me design a microservices architecture"
Claude: (automatically loads domain-driven-design, grpc-service-mesh, and other relevant skills)
```

## Available Commands

- `/elite-skills:configure` - Set up or update your API key
- `/elite-skills:status` - Check subscription and usage status

## Subscription Plans

- **Free:** 1 API key, 100 requests/month
- **Professional:** 5 API keys, unlimited requests

[View Pricing](https://skills.1shotlabs.com/pricing)

## Support

- [Documentation](https://skills.1shotlabs.com/dashboard/plugin)
- [Report Issues](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues)
- [Skills Catalog](https://skills.1shotlabs.com/skills)

## License

MIT License - Copyright (c) 2026 1Shot Labs LLC
