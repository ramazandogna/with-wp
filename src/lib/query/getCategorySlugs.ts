import graphqlRequest from '../graphqlRequest';
import { GetCategorySlugsParams } from '../../types';

export async function getCategorySlugs({ name }: GetCategorySlugsParams = {}): Promise<
  { slug: string }[] | null
> {
  if (name) {
    const singleQuery = `
      query getCategorySlug($name: ID!) {
        category(id: $name, idType: NAME) {
          slug
        }
      }
    `;
    const resJson = await graphqlRequest<{ category: { slug: string } | null }>(singleQuery, {
      name
    });
    if (!resJson?.data?.category) return null;
    return [{ slug: resJson.data.category.slug }];
  }

  const allQuery = `
    query getAllCategorySlugs {
      categories(first: 100) {
        nodes {
          slug
        }
      }
    }
  `;
  const resJson = await graphqlRequest<{ categories: { nodes: { slug: string }[] } }>(allQuery);
  if (!resJson?.data?.categories?.nodes) return null;
  return resJson.data.categories.nodes;
}
