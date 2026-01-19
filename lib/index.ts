/**
 * Elite Skills Plugin Library
 *
 * This module exports all the core functionality for the Elite Skills plugin:
 * - API client for fetching skills
 * - Caching layer with ETag support
 * - Configuration management
 * - Type definitions
 */

// API Client
export {
  fetchSkill,
  fetchSkillWithCache,
  testApiKey,
  fetchCatalog,
} from './api-client';

// Cache
export {
  loadSkillCache,
  saveSkillCache,
  isSkillCacheValid,
  getSkillCacheEtag,
  loadCatalogCache,
  saveCatalogCache,
  clearCache,
  clearSkillCache,
  getCacheStats,
} from './cache';

// Config
export {
  getApiKey,
  saveApiKey,
  validateApiKeyFormat,
  configExists,
  getConfig,
} from './config';

// Types
export type {
  SkillConfig,
  SkillContent,
  SkillCache,
  CatalogCache,
  SkillCatalogItem,
  ApiErrorResponse,
} from './types';

export { ApiError, ConfigurationError } from './types';
