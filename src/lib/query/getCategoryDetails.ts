import { cache } from 'react';
import { CategoryDetails } from '../../types';
import graphqlRequest from '../graphqlRequest';
import { CACHE } from '../cache';

const query = `
  query getCategoryDetails($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      count
      name
      slug
      description
    }
  }
`;

/**
 * Fetch category details by slug
 * Wrapped with React cache() for request deduplication
 */
export const getCategoryDetails = cache(async (slug: string): Promise<CategoryDetails> => {
  const resJson = await graphqlRequest<{ category: CategoryDetails }>(query, { slug }, CACHE.category(slug));
  return resJson.data!.category;
});
