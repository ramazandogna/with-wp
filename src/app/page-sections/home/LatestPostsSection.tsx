'use client';
//react
import { useState } from 'react';
//components
import { Container, GetMorePost, PostCard, SectionTitle } from '@/components/common';
//types
import type { PostNode, PageInfo, PostResponse } from '@/types/posts';

// props type
type LatestPostsSectionProps = {
  initialPosts: PostNode[];
  initialPageInfo: PageInfo;
  taxonomy?: { key: string | null; value: string | null };
};

export function LatestPostsSection({
  initialPosts,
  initialPageInfo,
  taxonomy
}: LatestPostsSectionProps) {
  //posts state
  const [contents, setContents] = useState<PostResponse>({
    nodes: initialPosts,
    pageInfo: initialPageInfo
  });

  return (
    <Container>
      <span className="flex flex-col gap-4">
        {/* 
        Section Title 
        */}
        <SectionTitle>Blog Yazıları</SectionTitle>

        {/* 
        Posts 
        Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 bg-background/50 border-border/20 rounded-lg border px-8 py-4 shadow-lg backdrop-blur-lg">
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
        <div className="mt-8 flex justify-center">
          <GetMorePost
            contents={contents}
            setContents={setContents}
            taxonomy={taxonomy ?? { key: null, value: null }}
          />
        </div>
      </span>
    </Container>
  );
}
