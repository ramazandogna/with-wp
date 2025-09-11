"use client";
import { useState } from "react";
import { Container } from '@/components/layout';
import { PostCard } from '@/components/PostCard';
import GetMorePost from "@/components/GetMorePost";
import type { PostNode, PageInfo, PostResponse } from '@/types/posts';

type LatestPostsSectionProps = {
  initialPosts: PostNode[];
  initialPageInfo: PageInfo;
  taxonomy?: { key: string | null; value: string | null };
};

export function LatestPostsSection({ initialPosts, initialPageInfo, taxonomy }: LatestPostsSectionProps) {
  const [contents, setContents] = useState<PostResponse>({
    nodes: initialPosts,
    pageInfo: initialPageInfo
  });

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Yazıları</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {contents.nodes.map((post, idx) => (
            <PostCard
              key={post.databaseId}
              title={post.title}
              excerpt={post.excerpt}
              image={post.featuredImage?.node?.mediaDetails?.sizes?.[0]?.sourceUrl || undefined}
              date={new Date(post.date).toLocaleDateString('tr-TR')}
              category={post.categories?.nodes?.[0]?.name || undefined}
              variant={idx % 4 < 2 ? 'default' : 'alt'}
              className={(idx % 2 === 0 ? 'h-[250px]' : 'h-[200px]') + ' flex flex-col'}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <GetMorePost
            contents={contents}
            setContents={setContents}
            taxonomy={taxonomy ?? { key: null, value: null }}
          />
        </div>
      </div>
    </Container>
  );
}