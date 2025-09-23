import { Card, CardContent, CardHeader } from '@/components/ui';
import clsx from 'clsx';

type PostCardProps = {
  title: string;
  excerpt: string;
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
      <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-t-xl bg-gray-200 md:h-48">
        {image ? <img src={image} alt={title} className="h-full w-full object-cover" /> : null}
      </div>
      <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
        <CardHeader className="px-0 pt-0 pb-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-primary text-xs font-semibold">{category}</span>
            <span className="text-muted-foreground text-xs">{date}</span>
          </div>
          <h2 className="text-lg font-bold">{title}</h2>
        </CardHeader>
        <CardContent className="flex-1 px-0 pt-0">
          <p className="text-muted-foreground text-sm">{excerpt}</p>
        </CardContent>
      </div>
    </Card>
  );
}
