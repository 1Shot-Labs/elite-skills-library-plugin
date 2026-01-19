/**
 * Configuration management for Elite Skills Plugin
 * Handles API key storage and retrieval from .elite-skills.local.md
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { SkillConfig, ConfigurationError } from './types';

const CONFIG_FILE = '.claude/.elite-skills.local.md';

/**
 * Get the project root directory
 * Uses CLAUDE_PROJECT_ROOT env var or falls back to cwd
 */
function getProjectRoot(): string {
  return process.env.CLAUDE_PROJECT_ROOT || process.cwd();
}

/**
 * Get the full path to the config file
 */
function getConfigPath(): string {
  return path.join(getProjectRoot(), CONFIG_FILE);
}

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content: string): Record<string, string> {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {};
  }

  const frontmatter: Record<string, string> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }

  return frontmatter;
}

/**
 * Get the API key from the config file
 * @returns The API key or null if not configured
 */
export async function getApiKey(): Promise<string | null> {
  const configPath = getConfigPath();

  try {
    const content = await fs.readFile(configPath, 'utf-8');
    const frontmatter = parseFrontmatter(content);
    return frontmatter.api_key || null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * Validate API key format
 * @returns true if key format is valid
 */
export function validateApiKeyFormat(key: string): boolean {
  return key.startsWith('esk_') && key.length === 68;
}

/**
 * Save the API key to the config file
 * Creates the file if it doesn't exist
 */
export async function saveApiKey(key: string): Promise<void> {
  if (!validateApiKeyFormat(key)) {
    throw new ConfigurationError(
      'Invalid API key format. Keys must start with "esk_" and be 68 characters long.'
    );
  }

  const configPath = getConfigPath();
  const configDir = path.dirname(configPath);

  // Ensure .claude directory exists
  await fs.mkdir(configDir, { recursive: true });

  const timestamp = new Date().toISOString();
  const content = `---
api_key: ${key}
configured_at: "${timestamp}"
---

# Elite Skills Configuration

This file contains your Elite Skills API key. Keep it secure and do not commit to version control.

## Getting a New Key

Visit https://skills.1shotlabs.com/dashboard/api-keys to generate a new key.

## Troubleshooting

- If your key stops working, it may have been revoked or expired
- Check your subscription status at https://skills.1shotlabs.com/dashboard
`;

  await fs.writeFile(configPath, content, 'utf-8');
}

/**
 * Check if a config file exists
 */
export async function configExists(): Promise<boolean> {
  const configPath = getConfigPath();

  try {
    await fs.access(configPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the full config including metadata
 */
export async function getConfig(): Promise<SkillConfig | null> {
  const configPath = getConfigPath();

  try {
    const content = await fs.readFile(configPath, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter.api_key) {
      return null;
    }

    return {
      api_key: frontmatter.api_key,
      key_name: frontmatter.key_name,
      configured_at: frontmatter.configured_at,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}
