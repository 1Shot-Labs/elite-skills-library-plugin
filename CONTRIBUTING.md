# Contributing to Elite Skills Library Plugin

Thank you for your interest in contributing to the Elite Skills Library plugin! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Requesting New Skills](#requesting-new-skills)
- [Getting Help](#getting-help)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and constructive in all interactions
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## Ways to Contribute

### Report Bugs

Found a bug? Please [open an issue](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues/new) with:

- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment (OS, Claude Code version)
- Any error messages or logs

### Suggest Features

Have an idea? We'd love to hear it! [Open a feature request](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues/new) with:

- Clear description of the feature
- Use case / why this would be useful
- Any implementation ideas (optional)

### Improve Documentation

Documentation improvements are always welcome:

- Fix typos and grammatical errors
- Clarify confusing sections
- Add missing information
- Improve examples

### Submit Code

Ready to code? See the development setup below and our pull request process.

## Development Setup

### Prerequisites

- Git
- Text editor (VS Code recommended)
- Claude Code CLI (for testing)
- GitHub account

### Clone the Repository

```bash
git clone https://github.com/1Shot-Labs/elite-skills-library-plugin.git
cd elite-skills-library-plugin
```

### Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### Local Testing

To test your changes locally:

1. **Link the plugin locally:**

   In your test project, create a symlink or copy:
   ```bash
   cd /path/to/test/project
   mkdir -p .claude-plugins
   ln -s /path/to/elite-skills-library-plugin .claude-plugins/elite-skills
   ```

2. **Start Claude Code:**
   ```bash
   claude
   ```

3. **Test your changes:**
   - Run commands (`/elite-skills:configure`, `/elite-skills:status`)
   - Verify skill loading works
   - Check error handling

## Project Structure

```
elite-skills-library-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── commands/
│   ├── configure.md         # Configure command definition
│   └── status.md            # Status command definition
├── skills/
│   └── SKILL.md             # Meta-skill for API integration
├── docs/
│   └── elite-skills.local.example.md  # Example config
├── README.md                # Main documentation
├── INSTALLATION.md          # Detailed installation guide
├── CONTRIBUTING.md          # This file
├── CHANGELOG.md             # Version history
├── LICENSE                  # MIT License
└── .gitignore               # Git ignore rules
```

### Key Files

| File | Purpose |
|------|---------|
| `plugin.json` | Plugin metadata, version, author info |
| `commands/*.md` | Slash command definitions with YAML frontmatter |
| `skills/SKILL.md` | Main skill file with triggers and API integration |

### Command Files

Command files use YAML frontmatter:

```markdown
---
description: Brief description of what the command does
---

# Command Title

Instructions for Claude when this command is invoked.
```

### Skill Files

Skill files define triggers and content:

```markdown
---
name: skill-name
description: What this skill does
triggers:
  - "keyword 1"
  - "keyword 2"
---

# Skill Content

The actual skill knowledge and instructions.
```

## Making Changes

### Documentation Changes

1. Edit the relevant `.md` file
2. Preview your changes (VS Code has markdown preview)
3. Ensure links work
4. Check formatting

### Command Changes

1. Edit files in `commands/`
2. Update the YAML frontmatter if needed
3. Test the command in Claude Code
4. Update README if behavior changes

### Plugin Manifest Changes

1. Edit `.claude-plugin/plugin.json`
2. Increment version number following semver
3. Update CHANGELOG.md

## Testing

### Manual Testing Checklist

Before submitting, verify:

- [ ] `/elite-skills:configure` works correctly
- [ ] `/elite-skills:status` shows accurate information
- [ ] Skills load when triggered by relevant queries
- [ ] Error messages are clear and helpful
- [ ] Documentation is accurate

### Test Scenarios

1. **Fresh Installation**
   - Remove existing config
   - Install plugin
   - Configure API key
   - Verify status

2. **Invalid API Key**
   - Use an incorrect key
   - Verify error message

3. **Network Errors**
   - Disconnect from internet
   - Attempt to load a skill
   - Verify graceful degradation

4. **Rate Limiting**
   - Use a key near its limit
   - Verify limit messages

## Submitting Changes

### Pull Request Process

1. **Update documentation** if your changes affect user-facing behavior

2. **Update CHANGELOG.md** with your changes under "Unreleased"

3. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what and why
   - Link to related issues (if any)
   - Screenshots (for UI changes)

5. **Respond to feedback** from maintainers

### PR Title Format

Use conventional commit format:

- `feat: add new feature`
- `fix: resolve bug with X`
- `docs: update installation guide`
- `refactor: improve code structure`
- `chore: update dependencies`

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Documentation updated (if applicable)
- [ ] CHANGELOG.md updated
- [ ] All tests pass
- [ ] PR has clear description

## Style Guidelines

### Markdown Style

- Use ATX-style headers (`#`, `##`, etc.)
- One sentence per line (for easier diffs)
- Use fenced code blocks with language identifiers
- Include alt text for images
- Use reference-style links for repeated URLs

**Example:**
```markdown
# Good Header

This is a sentence.
This is another sentence on a new line.

```bash
code example with language identifier
```
```

### YAML Frontmatter

- Use lowercase keys
- Quote strings with special characters
- Keep it minimal and focused

**Example:**
```yaml
---
name: my-skill
description: A brief, clear description
triggers:
  - "keyword one"
  - "keyword two"
---
```

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Examples:**
```
feat(commands): add verbose output option to status

docs(readme): improve troubleshooting section

fix(skills): handle network timeout gracefully
```

## Requesting New Skills

Want to see a new skill in the Elite Skills Library?

### How to Request

1. [Open an issue](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues/new)
2. Use the title format: `[Skill Request] Skill Name`
3. Include:
   - **Domain/Topic**: What area does this cover?
   - **Use Case**: When would someone need this?
   - **Key Topics**: What should the skill include?
   - **Example Queries**: What might trigger this skill?

### Example Skill Request

```markdown
Title: [Skill Request] GraphQL API Design

**Domain:** API Development

**Use Case:** Developers designing GraphQL APIs need guidance on
schema design, resolvers, performance, and best practices.

**Key Topics:**
- Schema design patterns
- Query and mutation design
- N+1 problem and DataLoader
- Authentication and authorization
- Error handling
- Pagination patterns

**Example Queries:**
- "Design a GraphQL schema for an e-commerce app"
- "How do I handle authentication in GraphQL?"
- "Best practices for GraphQL pagination"
```

### Skill Selection Criteria

We prioritize skills that:

- Cover in-demand topics
- Require deep expertise
- Have broad applicability
- Complement existing skills
- Have clear, actionable guidance

## Getting Help

### Questions About Contributing

- Open a [discussion](https://github.com/1Shot-Labs/elite-skills-library-plugin/discussions)
- Check existing issues for similar questions
- Ask in your PR (we're happy to help!)

### Contact

- Email: contribute@1shotlabs.com
- Issues: [GitHub Issues](https://github.com/1Shot-Labs/elite-skills-library-plugin/issues)

---

Thank you for contributing to Elite Skills Library! Your help makes this project better for everyone.
