//next
import Image from 'next/image';
//components
import { Button, Card, CardContent, CardHeader } from '@/components/ui';
//lib
import { getExcerpt } from '@/lib/stripTags';
import clsx from 'clsx';
import Link from 'next/link';

type PostCardProps = {
  title: string;
  excerpt: string;
  slug: string;
  image?: string | undefined;
  date: string;
  category?: string | undefined;
  variant?: 'default' | 'alt';
  className?: string;
};

export function PostCard({
  title,
  excerpt,
  image,
  date,
  slug,
  category,
  variant = 'default',
  className
}: PostCardProps) {
  return (
    <Card
      className={clsx(
        variant === 'alt'
          ? 'border border-white/30 bg-white/5 px-8 py-4 shadow-lg backdrop-blur-3xl'
          : '',
        className,
        '!p-0',
        'flex h-full flex-col'
      )}
    >
      {/*
      Image 
      */}
      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-t-lg bg-gray-200 md:h-80">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-[center_top]"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
            quality={75}
          />
        ) : null}
      </div>
      {/*
      Text Content 
      */}
      <div className="flex flex-1 flex-col px-6 pb-6">
        <CardHeader className="px-0 pt-0 pb-2">
          <div className="mb-2 flex items-center justify-between">
            {/*
            Category and Date
            */}
            <span className="text-primary text-xs font-semibold">{category}</span>
            <span className="text-muted-foreground text-xs">{date}</span>
          </div>
          {/*
           Title
           */}
          <h2 className="text-[24px] font-bold">{title}</h2>
        </CardHeader>
        <CardContent className="flex-1 px-0 pt-0">
          {/* 
          Excerpt
           */}
          <p className="text-muted-foreground">{getExcerpt(excerpt, { raw: true })}</p>
          {/*
           Read More Button 
           */}
          <Link href={`/${slug}`}>
            <Button
              variant="link"
              className="mt-4 px-0 text-[15px] font-semibold italic opacity-50 hover:opacity-75"
            >
              Devamını Oku &rarr;
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}
