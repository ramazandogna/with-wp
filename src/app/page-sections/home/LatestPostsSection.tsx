'use client';
//react
import { useState, useMemo } from 'react';
//components
import { Container, GetMorePost, PostCard, SectionTitle } from '@/components/common';
//types
import type { PostNode, PageInfo, PostResponse } from '@/types/posts';

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
  const [contents, setContents] = useState<PostResponse>({
    nodes: initialPosts,
    pageInfo: initialPageInfo
  });

  const processedPosts = useMemo(
    () =>
      contents.nodes.map((post, idx) => ({
        ...post,
        formattedDate: new Date(post.date).toLocaleDateString('tr-TR'),
        variant: (idx % 4 < 2 ? 'default' : 'alt') as 'default' | 'alt',
        dynamicClassName:
          (idx % 2 === 0 ? 'h-[250px]' : 'h-[200px]') + ' shadow-0 flex flex-col border-0',
        imageUrl: post.featuredImage?.node.mediaDetails.sizes?.at(-1)?.sourceUrl,
        categoryName: post.categories?.nodes?.[0]?.name
      })),
    [contents.nodes]
  );

  return (
    <Container className="pb-4">
      <span className="flex flex-col gap-4">
        <SectionTitle>Blog Yazıları</SectionTitle>
        <div className="bg-background/50 border-border/20 grid grid-cols-1 gap-6 rounded-lg border px-8 py-8 shadow-lg backdrop-blur-lg">
          {processedPosts.map((post) => (
            <PostCard
              key={post.databaseId}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              image={post.imageUrl}
              date={post.formattedDate}
              category={post.categoryName}
              variant={post.variant}
              className={post.dynamicClassName}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
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
