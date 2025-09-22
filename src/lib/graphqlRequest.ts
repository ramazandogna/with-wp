import { GraphQLResponse } from '../types/api';

export default async function graphqlRequest<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<GraphQLResponse<T>> {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers.Authorization = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  if (!url) throw new Error('NEXT_PUBLIC_GRAPHQL_URL tanımlı değil');

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const resJson: GraphQLResponse<T> = await res.json();
    return resJson;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}
