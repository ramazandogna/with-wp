import { Container } from '@/components/common';

type PostContentProps = {
  content: string;
  title: string;
};

export default function PostContent({ content, title }: PostContentProps) {
  return (
    <div className="mx-auto">
      <article className="post-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
}
