import { LatestPostsSection } from './LatestPostsSection';
import { getPosts } from '@/lib/wp-api';
import type { PostNode, PageInfo } from '@/types/posts';

export async function HomeMain() {
	const { nodes, pageInfo } = await getPosts({ howMany: 2 });
	return <LatestPostsSection initialPosts={nodes as PostNode[]} initialPageInfo={pageInfo as PageInfo} />;
}
