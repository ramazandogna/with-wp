import { PostResponse, GetRelatedPostsParams } from '../../types';
import graphqlRequest from '../graphqlRequest';

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

  const resJson = await graphqlRequest<{ posts: PostResponse }>(query, variables);
  return resJson.data!.posts;
}
