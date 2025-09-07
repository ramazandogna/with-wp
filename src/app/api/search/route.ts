import { NextRequest } from 'next/server';
import { getPosts } from '@/lib/wp-api';

export async function POST(req: NextRequest) {
  const { query = '', endCursor = '', taxonomy = null, howMany = 2 } = await req.json();
  const results = await getPosts({ endCursor, taxonomy, howMany, search: query });
  return Response.json(results);
}
