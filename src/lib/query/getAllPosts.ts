import { PostResponse, TaxonomyFilter } from '../../types';
import graphqlRequest from '../graphqlRequest';

export async function getAllPosts(
  endCursor = '',
  taxonomy: TaxonomyFilter | null = null,
  howMany = 5,
  search: string | null = null
): Promise<PostResponse> {
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

  const resJson = await graphqlRequest<{ posts: PostResponse }>(query, variables);

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
