import graphqlRequest from '../graphqlRequest';
import { PostComments, GetCommentsParams } from '../../types';

export async function getComments({ slug, startCursor = '' }: GetCommentsParams): Promise<PostComments> {
  const query = `
    query getComments($slug: ID!, $before: String) {
      post(id: $slug, idType: SLUG) {
        commentCount
        comments(where: {order: ASC, orderby: COMMENT_DATE}, first: 10, before: $before) {
          nodes {
            content
            author {
              node {
                name
              }
            }
            date
            parentId
            id
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    }
  `;

  const variables = {
    slug,
    before: startCursor || null
  };

  const resJson = await graphqlRequest<{ post: PostComments }>(query, variables);
  return resJson.data!.post;
}
