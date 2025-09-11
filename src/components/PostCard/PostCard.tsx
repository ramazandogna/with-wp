
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
  className,
}: PostCardProps) {
  return (
    <Card className={clsx(variant === 'alt' ? 'bg-muted/60 border-primary' : '', className, '!p-0', 'flex flex-col h-full')}> 
      <div className="w-full h-40 md:h-48 bg-gray-200 rounded-t-xl overflow-hidden flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex-1 flex flex-col pt-4 pb-6 px-6">
        <CardHeader className="px-0 pt-0 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-primary font-semibold">{category}</span>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <h2 className="text-lg font-bold">{title}</h2>
        </CardHeader>
        <CardContent className="px-0 pt-0 flex-1">
          <p className="text-sm text-muted-foreground">{excerpt}</p>
        </CardContent>
      </div>
    </Card>
  );
}