import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PostCardProps } from './post-card.types';



export function PostCard({ title, excerpt, date }: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{excerpt}</p>
        <time>{date}</time>
      </CardContent>
    </Card>
  );
}
