import { PostType } from '../../types';
import graphqlRequest from '../graphqlRequest';

const query = `
  query getSinglePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      content(format: RENDERED)
      modified
      slug
      title(format: RENDERED)
      databaseId
      featuredImage {
        node {
          mediaDetails {
            sizes {
              sourceUrl
              width
              height
            }
          }
        }
      }
      commentCount
      categories {
        nodes {
          name
          slug
          link
        }
      }
      date
      excerpt(format: RENDERED)
      author {
        node {
          name
        }
      }
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphUrl
        opengraphType
        opengraphSiteName
        opengraphPublisher
        opengraphPublishedTime
        opengraphModifiedTime
        readingTime
      }
    }
  }
`;

export async function getSinglePost(slug: string): Promise<PostType> {
  const resJson = await graphqlRequest<{ post: PostType }>(query, { slug });
  return resJson.data!.post;
}
