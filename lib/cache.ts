/**
 * Caching layer for Elite Skills Plugin
 * Implements skill caching with ETag support for conditional requests
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { SkillCache, CatalogCache, SkillContent, SkillCatalogItem } from './types';

const CACHE_DIR = '.claude/cache/elite-skills';
const SKILLS_CACHE_DIR = 'skills';
const CATALOG_CACHE_FILE = 'catalog.json';
const SKILL_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const CATALOG_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get the project root directory
 */
function getProjectRoot(): string {
  return process.env.CLAUDE_PROJECT_ROOT || process.cwd();
}

/**
 * Get the cache directory path
 */
function getCacheDir(): string {
  return path.join(getProjectRoot(), CACHE_DIR);
}

/**
 * Get the skills cache directory path
 */
function getSkillsCacheDir(): string {
  return path.join(getCacheDir(), SKILLS_CACHE_DIR);
}

/**
 * Ensure cache directories exist
 */
async function ensureCacheDir(): Promise<void> {
  await fs.mkdir(getSkillsCacheDir(), { recursive: true });
}

/**
 * Get the cache file path for a skill
 */
function getSkillCachePath(slug: string): string {
  return path.join(getSkillsCacheDir(), `${slug}.json`);
}

/**
 * Get the catalog cache file path
 */
function getCatalogCachePath(): string {
  return path.join(getCacheDir(), CATALOG_CACHE_FILE);
}

/**
 * Load skill cache from disk
 * @returns The cached skill data or null if not found/expired
 */
export async function loadSkillCache(slug: string): Promise<SkillCache | null> {
  const cachePath = getSkillCachePath(slug);

  try {
    const content = await fs.readFile(cachePath, 'utf-8');
    const cache: SkillCache = JSON.parse(content);

    // Check if cache is expired
    if (Date.now() - cache.cachedAt > SKILL_CACHE_TTL) {
      return null;
    }

    return cache;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    // If JSON parsing fails, treat as cache miss
    if (error instanceof SyntaxError) {
      return null;
    }
    throw error;
  }
}

/**
 * Save skill to cache
 */
export async function saveSkillCache(
  slug: string,
  skill: SkillContent,
  etag: string
): Promise<void> {
  await ensureCacheDir();

  const cache: SkillCache = {
    skill,
    version: skill.version,
    etag,
    cachedAt: Date.now(),
  };

  const cachePath = getSkillCachePath(slug);
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2), 'utf-8');
}

/**
 * Check if skill cache is valid (not expired)
 */
export async function isSkillCacheValid(slug: string): Promise<boolean> {
  const cache = await loadSkillCache(slug);
  return cache !== null;
}

/**
 * Get the ETag for a cached skill
 * Used for conditional requests (If-None-Match header)
 */
export async function getSkillCacheEtag(slug: string): Promise<string | null> {
  const cache = await loadSkillCache(slug);
  return cache?.etag || null;
}

/**
 * Load catalog cache from disk
 */
export async function loadCatalogCache(): Promise<CatalogCache | null> {
  const cachePath = getCatalogCachePath();

  try {
    const content = await fs.readFile(cachePath, 'utf-8');
    const cache: CatalogCache = JSON.parse(content);

    // Check if cache is expired
    if (Date.now() - cache.fetchedAt > cache.ttl) {
      return null;
    }

    return cache;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    if (error instanceof SyntaxError) {
      return null;
    }
    throw error;
  }
}

/**
 * Save catalog to cache
 */
export async function saveCatalogCache(skills: SkillCatalogItem[]): Promise<void> {
  await ensureCacheDir();

  const cache: CatalogCache = {
    skills,
    fetchedAt: Date.now(),
    ttl: CATALOG_CACHE_TTL,
  };

  const cachePath = getCatalogCachePath();
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2), 'utf-8');
}

/**
 * Clear all cached data
 */
export async function clearCache(): Promise<void> {
  const cacheDir = getCacheDir();

  try {
    await fs.rm(cacheDir, { recursive: true, force: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }
}

/**
 * Clear a specific skill from cache
 */
export async function clearSkillCache(slug: string): Promise<void> {
  const cachePath = getSkillCachePath(slug);

  try {
    await fs.unlink(cachePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
  catalogCached: boolean;
  cachedSkillCount: number;
  cacheDir: string;
}> {
  const skillsDir = getSkillsCacheDir();
  let cachedSkillCount = 0;

  try {
    const files = await fs.readdir(skillsDir);
    cachedSkillCount = files.filter((f) => f.endsWith('.json')).length;
  } catch {
    // Directory doesn't exist
  }

  const catalogCache = await loadCatalogCache();

  return {
    catalogCached: catalogCache !== null,
    cachedSkillCount,
    cacheDir: getCacheDir(),
  };
}
