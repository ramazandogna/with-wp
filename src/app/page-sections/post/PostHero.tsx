
import Image from 'next/image';
import { Container } from '@/components/common';

type PostHeroProps = {
  title: string;
  featuredImage: {
    sourceUrl: string;
    width?: number;
    height?: number;
  } | undefined;
  date: string;
  categories: Array<{
    name: string;
    slug: string;
    link?: string;
  }>;
  author?: {
    name: string;
  };
  commentCount: number;
};

export default function PostHero({ 
  title, 
  featuredImage, 
  date, 
  categories, 
  author, 
  commentCount 
}: PostHeroProps) {
  return (
    <span>
      <div className="mx-auto max-w-4xl">
        {/* Featured Image */}
        {featuredImage && (
          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={featuredImage.sourceUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
              quality={90}
            />
          </div>
        )}
        
        {/* Post Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {categories.length > 0 && categories[0] && (
            <span className="text-primary font-semibold">
              {categories[0].name}
            </span>
          )}
          <span>•</span>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {author && (
            <>
              <span>•</span>
              <span>{author.name}</span>
            </>
          )}
          {commentCount > 0 && (
            <>
              <span>•</span>
              <span>{commentCount} yorum</span>
            </>
          )}
        </div>

        {/* Post Title */}
        <h1 className="mb-8 text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>
      </div>
    </span>
  );
}
