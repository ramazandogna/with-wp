import PostHero from './PostHero';
import PostContent from './PostContent';
import RelatedPosts from './RelatedPosts';
import { PostType } from '@/types';
import { Card } from '@/components/ui';
import { Container } from '@/components/common';

type PostDetailMainProps = {
  post: PostType;
};

export default function PostDetailMain({ post }: PostDetailMainProps) {
  // Hero için veri hazırla
  const heroData = {
    title: post.title,
    featuredImage: post.featuredImage?.node?.mediaDetails?.sizes?.at(-1),
    date: post.date,
    categories: post.categories.nodes?.map(({ name, slug, link }) => ({ name, slug, link })),
    author: post.author?.node,
    commentCount: post.commentCount || 0,
    slug: post.slug,
    postLenght: post.content.length
  };

  // Content için veri hazırla
  const contentData = {
    content: post.content,
    title: post.title
  };

  return (
    <Container>
      <div className="bg-background/50 border-border/20 grid grid-cols-1 gap-6 rounded-lg border px-8 py-8 shadow-lg backdrop-blur-lg">
        {/* 
        Post Hero Sectoion 
        */}
        <PostHero {...heroData} />
        {/* 
        Post Related Posts Section 
        */}
        <PostContent {...contentData} />
      </div>
    </Container>
  );
}
