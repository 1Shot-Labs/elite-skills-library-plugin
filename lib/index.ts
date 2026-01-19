/**
 * Elite Skills Plugin Library
 *
 * This module exports all the core functionality for the Elite Skills plugin:
 * - API client for fetching skills
 * - Caching layer with ETag support
 * - Configuration management
 * - Status and subscription management
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
  getApiKeySync,
  saveApiKey,
  deleteApiKey,
  validateApiKeyFormat,
  validateApiKeyFormatDetailed,
  configExists,
  isConfigured,
  getConfig,
  getConfigPath,
  API_BASE_URL,
} from './config';

// Status and subscription management
export {
  getSubscriptionStatus,
  formatStatusDisplay,
  formatErrorDisplay,
  type SubscriptionStatus,
  type StatusError,
} from './status';

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
