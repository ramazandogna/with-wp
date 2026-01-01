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
    <Container className='pb-4'>
      <span className="flex flex-col gap-4">
        {/* 
        Section Title 
        */}
        <SectionTitle>Blog Yazıları</SectionTitle>

        {/* 
        Posts 
        Grid */}
        <div className="bg-background/50 border-border/20 grid grid-cols-1 gap-6 rounded-lg border px-8 py-8 shadow-lg backdrop-blur-lg">
          {contents.nodes.map((post, idx) => (
            <PostCard
              key={post.databaseId}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              image={post.featuredImage?.node.mediaDetails.sizes?.at(-1)?.sourceUrl}
              date={new Date(post.date).toLocaleDateString('tr-TR')}
              category={post.categories?.nodes?.[0]?.name || undefined}
              variant={idx % 4 < 2 ? 'default' : 'alt'}
              className={
                (idx % 2 === 0 ? 'h-[250px]' : 'h-[200px]') + ' shadow-0 flex flex-col border-0'
              }
            />
          ))}
        </div>
        <div className="flex justify-center">
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
