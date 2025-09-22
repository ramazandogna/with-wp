import { CreateCommentInput, CreateCommentResponse } from '@/types';
import graphqlRequest from '../graphqlRequest';

export async function createComment({
  body
}: {
  body: CreateCommentInput;
}): Promise<CreateCommentResponse> {
  const mutation = `
    mutation createComment($author: String!, $authorEmail: String!, $commentOn: Int!, $content: String!) {
      createComment(
        input: {
          author: $author,
          authorEmail: $authorEmail,
          clientMutationId: "uniqueId",
          content: $content,
          commentOn: $commentOn
        }
      ) {
        success
      }
    }
  `;

  const variables = {
    author: body.author,
    authorEmail: body.authorEmail,
    commentOn: parseInt(body.postId),
    content: body.content
  };

  const resJson = await graphqlRequest<CreateCommentResponse>(mutation, variables);
  return resJson.data!;
}
