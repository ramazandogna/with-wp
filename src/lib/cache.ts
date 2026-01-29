/**
 * Centralized Cache Configuration
 *
 * Single source of truth for all cache strategies.
 * Change cache duration here → affects entire application.
 */

// Cache duration constants (in seconds)
export const CACHE_DURATION = {
  ONE_HOUR: 3600,
  ONE_DAY: 86400,
  ONE_WEEK: 604800
} as const;

// Cache option types for Next.js fetch
export type CacheOptions = {
  revalidate?: number | false;
  cache?: 'force-cache' | 'no-store';
  tags?: string[];
};

/**
 * Pre-defined cache strategies
 *
 * Usage:
 * - CACHE.DEFAULT → Standard ISR (1 hour)
 * - CACHE.DYNAMIC → No cache (fresh data)
 * - CACHE.BUILD → Long cache for static generation
 * - CACHE.post('my-slug') → Post-specific with tag
 */
export const CACHE = {
  // Standard ISR: 1 hour cache
  DEFAULT: {
    revalidate: CACHE_DURATION.ONE_HOUR
  } as CacheOptions,

  // Dynamic content: no cache (search, comments)
  DYNAMIC: {
    cache: 'no-store'
  } as CacheOptions,

  // Build optimization: 24 hour cache (generateStaticParams)
  BUILD: {
    revalidate: CACHE_DURATION.ONE_DAY
  } as CacheOptions,

  // Post list with tag for on-demand revalidation
  POSTS: {
    revalidate: CACHE_DURATION.ONE_HOUR,
    tags: ['posts']
  } as CacheOptions,

  // Related posts
  RELATED_POSTS: {
    revalidate: CACHE_DURATION.ONE_HOUR,
    tags: ['related-posts']
  } as CacheOptions,

  // Build cache for post slugs
  POST_SLUGS: {
    revalidate: CACHE_DURATION.ONE_DAY,
    tags: ['post-slugs']
  } as CacheOptions,

  // Build cache for category slugs
  CATEGORY_SLUGS: {
    revalidate: CACHE_DURATION.ONE_DAY,
    tags: ['category-slugs']
  } as CacheOptions,

  // Dynamic cache generators (with unique tags)
  post: (slug: string): CacheOptions => ({
    revalidate: CACHE_DURATION.ONE_HOUR,
    tags: [`post-${slug}`]
  }),

  category: (slug: string): CacheOptions => ({
    revalidate: CACHE_DURATION.ONE_HOUR,
    tags: [`category-${slug}`]
  })
} as const;
