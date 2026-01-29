import { GraphQLResponse } from '../types/api';
import { CacheOptions, CACHE } from './cache';

// Re-export for backward compatibility
export type { CacheOptions as GraphQLCacheOptions };

export default async function graphqlRequest<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  cacheOptions: CacheOptions = CACHE.DEFAULT
): Promise<GraphQLResponse<T>> {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers.Authorization = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  if (!url) throw new Error('NEXT_PUBLIC_GRAPHQL_URL tanımlı değil');

  // Build Next.js fetch options
  const fetchOptions: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables })
  };

  // Apply cache strategy
  if (cacheOptions.cache === 'no-store') {
    fetchOptions.cache = 'no-store';
  } else {
    fetchOptions.next = {};
    if (cacheOptions.revalidate !== undefined) {
      fetchOptions.next.revalidate = cacheOptions.revalidate;
    }
    if (cacheOptions.tags?.length) {
      fetchOptions.next.tags = cacheOptions.tags;
    }
  }

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const resJson: GraphQLResponse<T> = await res.json();
    return resJson;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}
