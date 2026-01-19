# Elite Skills Library Plugin

Transform Claude Code into a domain expert with 270+ professional-grade skills. From system design to chaos engineering, get expert-level guidance on demand.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-270%2B-green.svg)](https://skills.1shotlabs.com/skills)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)](CHANGELOG.md)

## What is Elite Skills Library?

Elite Skills Library is a subscription-based collection of premium Claude Code skills. Each skill transforms Claude into a domain expert, providing:

- **Deep technical knowledge** - Comprehensive coverage of complex topics
- **Best practices** - Industry-standard patterns and approaches
- **Practical examples** - Real-world code samples and configurations
- **Trigger-based loading** - Skills automatically activate when relevant

**Example domains covered:**
- Domain-Driven Design and microservices architecture
- Chaos engineering and resilience testing
- Functional programming patterns
- Technical interview preparation
- Cloud platform engineering (AWS, GCP, Azure)
- Database optimization and data engineering
- Security best practices and DevSecOps
- And 260+ more...

## Prerequisites

Before installing the plugin, ensure you have:

- **Claude Code** - The official CLI from Anthropic ([installation guide](https://docs.anthropic.com/claude-code))
- **Active subscription** - Free or Professional plan at [skills.1shotlabs.com](https://skills.1shotlabs.com)
- **API key** - Generated from your dashboard

### Verify Claude Code Installation

```bash
claude --version
```

If Claude Code is not installed, follow the [official installation guide](https://docs.anthropic.com/claude-code).

## Quick Start

### Step 1: Add the 1Shot Labs Marketplace

From within Claude Code:

```bash
/plugin marketplace add 1Shot-Labs/marketplace
```

### Step 2: Install the Plugin

```bash
/plugin install elite-skills@1shot
```

### Step 3: Configure Your API Key

The plugin will automatically prompt for your API key on first use. Alternatively, configure it manually:

```bash
/elite-skills:configure
```

That's it! Skills will now automatically load when Claude determines they're relevant.

## Getting Your API Key

1. **Sign up** at [skills.1shotlabs.com](https://skills.1shotlabs.com)
2. **Subscribe** to a plan (Free tier available)
3. Navigate to **Dashboard** > **API Keys**
4. Click **Create New Key**
5. Copy the key (starts with `esk_`)

Your API key is stored locally in `.claude/.elite-skills.local.md` and is automatically gitignored.

## Usage

Skills load automatically based on context. Just ask Claude questions naturally:

```
You: "Help me design a microservices architecture for an e-commerce platform"

Claude: (automatically loads domain-driven-design, grpc-service-mesh,
         event-sourcing, and other relevant skills)

        "Let me help you design a microservices architecture. Based on
         elite skills knowledge, here's a recommended approach..."
```

```
You: "Set up chaos engineering for my Kubernetes cluster"

Claude: (automatically loads chaos-engineering skill)

        "I'll guide you through implementing chaos engineering.
         Let's start with defining your steady state hypothesis..."
```

```
You: "Prepare me for a system design interview"

Claude: (automatically loads technical-interviewing skill)

        "Let's prepare you for system design interviews.
         I'll cover the key patterns and practice problems..."
```

## Available Commands

| Command | Description |
|---------|-------------|
| `/elite-skills:configure` | Set up or update your API key |
| `/elite-skills:status` | Check subscription status and usage |

## Subscription Plans

| Feature | Free | Professional |
|---------|------|--------------|
| API Keys | 1 | 5 |
| Monthly Requests | 100 | Unlimited |
| All Skills Access | Yes | Yes |
| Priority Support | - | Yes |
| Price | $0 | $29/month |

[View Pricing](https://skills.1shotlabs.com/pricing) | [Compare Plans](https://skills.1shotlabs.com/pricing#compare)

## Browse Skills

Explore the full catalog of 270+ skills:

- [Skills Catalog](https://skills.1shotlabs.com/skills) - Browse all available skills
- [Categories](https://skills.1shotlabs.com/skills#categories) - Filter by domain
- [Popular Skills](https://skills.1shotlabs.com/skills#popular) - Most-used skills

### Popular Skill Categories

- **Architecture**: Domain-Driven Design, Event Sourcing, CQRS
- **Cloud**: AWS, GCP, Azure, Kubernetes, Terraform
- **Data**: PostgreSQL, Redis, Kafka, Data Pipelines
- **Security**: OWASP, DevSecOps, Threat Modeling
- **Testing**: TDD, Chaos Engineering, Load Testing
- **Languages**: TypeScript, Rust, Go, Python patterns

## Troubleshooting

### "API key not configured"

Run the configure command:
```bash
/elite-skills:configure
```

### "Invalid API key"

1. Verify your key at [skills.1shotlabs.com/dashboard/api-keys](https://skills.1shotlabs.com/dashboard/api-keys)
2. Ensure the key hasn't been revoked
3. Check that the key starts with `esk_`
4. Re-run `/elite-skills:configure` with the correct key

### "Rate limit exceeded"

- **Free plan**: Limited to 100 requests/month
- **Solution**: Upgrade to Professional for unlimited requests
- Check your usage with `/elite-skills:status`

### "Skill not found"

1. Check the [Skills Catalog](https://skills.1shotlabs.com/skills) for available skills
2. Ensure correct spelling of skill names
3. Try searching by category or keyword

### "Network error" or "Connection failed"

1. Check your internet connection
2. Verify [skills.1shotlabs.com](https://skills.1shotlabs.com) is accessible
3. Check if you're behind a corporate proxy/firewall
4. Try again in a few moments

### Plugin Not Loading

1. Verify installation: `/plugin list`
2. Reinstall if needed:
   ```bash
   /plugin uninstall elite-skills@1shot
   /plugin install elite-skills@1shot
   ```

### Still Having Issues?

- [Open an Issue](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues/new)
- [Documentation](https://skills.1shotlabs.com/docs)
- Email: support@1shotlabs.com

## How It Works

```
+----------------+     +-------------------+     +------------------+
|                |     |                   |     |                  |
|  Claude Code   |---->|  Elite Skills     |---->|  skills.1shot    |
|  (your query)  |     |  Plugin           |     |  labs.com API    |
|                |     |                   |     |                  |
+----------------+     +-------------------+     +------------------+
                              |
                              v
                       +-------------------+
                       |                   |
                       |  Skill loaded     |
                       |  into context     |
                       |                   |
                       +-------------------+
```

1. **You ask Claude a question** - Natural language, no special syntax
2. **Claude analyzes context** - Determines relevant skills needed
3. **Plugin fetches skill** - Authenticated request to Elite Skills API
4. **Skill loads into context** - Claude gains expert knowledge
5. **Claude responds** - With enhanced, expert-level guidance

## Configuration Storage

Your configuration is stored in:
```
your-project/
  .claude/
    .elite-skills.local.md    # Your API key (gitignored)
```

See [docs/elite-skills.local.example.md](docs/elite-skills.local.example.md) for the configuration format.

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Links

- [Website](https://skills.1shotlabs.com)
- [Skills Catalog](https://skills.1shotlabs.com/skills)
- [Documentation](https://skills.1shotlabs.com/docs)
- [Dashboard](https://skills.1shotlabs.com/dashboard)
- [Pricing](https://skills.1shotlabs.com/pricing)
- [Changelog](CHANGELOG.md)
- [Report Issues](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues)

## License

MIT License - Copyright (c) 2026 1Shot Labs LLC

See [LICENSE](LICENSE) for details.

---

Made with expertise by [1Shot Labs](https://1shotlabs.com)
