import { PostResponse, GetAllPostsParams } from '../../types';
import graphqlRequest from '../graphqlRequest';
import { CacheOptions, CACHE } from '../cache';

export async function getAllPosts({
  endCursor = '',
  taxonomy = null,
  howMany = 5,
  search = null,
  cacheOptions
}: GetAllPostsParams & { cacheOptions?: CacheOptions } = {}): Promise<PostResponse> {
  const query = `
    query getAllPosts(
      $endCursor: String
      $search: String
      $categoryName: String
      $tag: String
    ) {
      posts(
        after: $endCursor
        first: ${howMany}
        where: {
          orderby: { field: DATE, order: DESC }
          search: $search
          categoryName: $categoryName
          tag: $tag
        }
      ) {
        nodes {
          date
          slug
          excerpt
          author {
            node {
              name
            }
          }
          databaseId
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

  const variables: {
    endCursor?: string;
    search?: string | null;
    categoryName?: string;
    tag?: string;
  } = {
    endCursor,
    search
  };

  if (taxonomy?.key === 'categoryName') {
    variables.categoryName = taxonomy.value;
  }

  if (taxonomy?.key === 'tag') {
    variables.tag = taxonomy.value;
  }

  // Use DYNAMIC for search (fresh results), POSTS for listings
  const defaultCache = search ? CACHE.DYNAMIC : CACHE.POSTS;

  const resJson = await graphqlRequest<{ posts: PostResponse }>(
    query,
    variables,
    cacheOptions ?? defaultCache
  );

  // Hata kontrolü
  if (!resJson?.data?.posts) {
    console.error('❌ GraphQL response error in getAllPosts:', resJson);
    return {
      nodes: [],
      pageInfo: {
        endCursor: '',
        hasPreviousPage: false,
        hasNextPage: false,
        startCursor: ''
      }
    };
  }

  return resJson.data.posts;
}
