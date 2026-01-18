import Image from 'next/image';
import BreadCrumb from '@/components/common/BreadCrumb';
import { BookOpenCheck, Calendar, MessageSquareText, UserPen } from 'lucide-react';

type PostHeroProps = {
  title: string;
  featuredImage:
    | {
        sourceUrl: string;
        width?: number;
        height?: number;
      }
    | undefined;
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
  slug: string;
  postLenght: number;
};

export default function PostHero({
  title,
  featuredImage,
  date,
  categories,
  author,
  commentCount,
  slug,
  postLenght,
}: PostHeroProps) {
  // Okuma süresi: Yoast SEO > Hesaplanan değer
  const calculatedReadTime = Math.ceil(postLenght / 5 / 180); // Ortalama 180 kelime/dakika ve 5 karakter/kelime varsayımıyla
  //date format like a 9 temmuz 2025
  const dateFormat = new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return (
    <span className="mx-auto flex w-full flex-col gap-6">
      {/* Featured Image */}
      {featuredImage && (
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
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

      {/* BreadCrumb */}
      <BreadCrumb title={title} categories={categories} slug={slug} />

      {/* Post Title */}
      <h1 className="text-4xl leading-tight font-bold md:text-5xl">{title}</h1>

      {/* Post Meta */}
      {/* <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
        {categories.length > 0 && categories[0] && (
          <span className="text-primary font-semibold">{categories[0].name}</span>
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
        {commentCount && (
          <>
            <span>•</span>
            <span>{commentCount} yorum</span>
          </>
        )}
      </div> */}
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
          <div className="flex items-center gap-1 ">
            <span>
              <UserPen size={14} />
            </span>
            <span>{author?.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>
              <Calendar size={14} />
            </span>
            <span>{dateFormat}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
          <div className="flex items-center gap-1 cursor-not-allowed">
            <span>
              <MessageSquareText size={14} />
            </span>
            <span>{commentCount}</span>
          </div>
          <div className="flex items-center gap-1 max-sm:justify-start">
            <span>
              <BookOpenCheck size={14} />
            </span>
            <span>{calculatedReadTime} dakika okuma süresi</span>
          </div>
        </div>
      </div>
    </span>
  );
}
