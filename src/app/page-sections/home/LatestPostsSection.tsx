"use client";
import { useState } from "react";
import { Container } from '@/components/layout';
import { PostCard } from '@/components/PostCard';
import GetMorePost from './GetMorePost';

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contents.nodes.map((post) => (
            <PostCard
              key={post.databaseId}
              title={post.title}
              excerpt={post.excerpt}
              date={new Date(post.date).toLocaleDateString('tr-TR')}
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
