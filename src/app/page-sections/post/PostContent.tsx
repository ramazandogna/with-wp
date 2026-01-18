import { Container } from '@/components/common';

type PostContentProps = {
  content: string;
  title: string;
};

export default function PostContent({ content, title }: PostContentProps) {
  return (
    <div className="mx-auto">
      <div dangerouslySetInnerHTML={{ __html: content }} className="post-content" />
    </div>
  );
}
