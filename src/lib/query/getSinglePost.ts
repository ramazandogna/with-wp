import { cache } from 'react';
import { PostType } from '../../types';
import graphqlRequest from '../graphqlRequest';
import { CACHE } from '../cache';

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

/**
 * Fetch single post by slug
 * Wrapped with React cache() for request deduplication within same render
 * (generateMetadata + PostPage = 1 request instead of 2)
 */
export const getSinglePost = cache(async (slug: string): Promise<PostType> => {
  const resJson = await graphqlRequest<{ post: PostType }>(query, { slug }, CACHE.post(slug));
  return resJson.data!.post;
});
