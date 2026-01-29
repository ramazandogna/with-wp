import graphqlRequest from '../graphqlRequest';
import { GetPostSlugsParams } from '../../types';
import { CACHE } from '../cache';

/**
 * Get post slugs for static generation
 * If slug provided: validates if post exists
 * If no slug: returns all slugs for generateStaticParams
 */
export async function getPostSlugs({ slug }: GetPostSlugsParams = {}): Promise<
  { slug: string }[] | null
> {
  if (slug) {
    const singleQuery = `
      query getPostSlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          slug
        }
      }
    `;
    const resJson = await graphqlRequest<{ post: { slug: string } | null }>(
      singleQuery,
      { slug },
      CACHE.post(slug)
    );

    if (!resJson?.data?.post) return null;
    return [{ slug: resJson.data.post.slug }];
  }

  const allQuery = `
    query getAllPostSlugs {
      posts(first: 100) {
        nodes {
          slug
        }
      }
    }
  `;

  const resJson = await graphqlRequest<{ posts: { nodes: { slug: string }[] } }>(
    allQuery,
    undefined,
    CACHE.POST_SLUGS
  );

  if (!resJson?.data?.posts?.nodes) return null;
  return resJson.data.posts.nodes;
}
