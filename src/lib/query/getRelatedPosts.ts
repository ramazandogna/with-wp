import { PostResponse, GetRelatedPostsParams } from '../../types';
import graphqlRequest from '../graphqlRequest';
import { CACHE } from '../cache';

/**
 * Fetch related posts by category
 * Cached for 1 hour, tagged for on-demand revalidation
 */
export async function getRelatedPosts({
  endCursor = '',
  categorySlugs,
  howMany = 2,
  excludeSlug
}: GetRelatedPostsParams): Promise<PostResponse> {
  const query = `
    query getRelatedPosts($endCursor: String, $categories: [String], $exclude: [String]) {
      posts(
        after: $endCursor,
        first: ${howMany},
        where: {
          orderby: {field: DATE, order: DESC},
          categoryNameIn: $categories,
          notIn: $exclude
        }
      ) {
        nodes {
          date
          slug
          excerpt
          featuredImage {
            node {
              mediaDetails {
                file
                sizes {
                  sourceUrl
                  height
                  width
                }
              }
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          title
        }
        pageInfo {
          endCursor
          hasPreviousPage
          hasNextPage
          startCursor
        }
      }
    }
  `;

  const variables = {
    endCursor,
    categories: categorySlugs,
    exclude: [excludeSlug]
  };

  const resJson = await graphqlRequest<{ posts: PostResponse }>(query, variables, CACHE.RELATED_POSTS);
  return resJson.data!.posts;
}
