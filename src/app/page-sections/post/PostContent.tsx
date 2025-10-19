import { Container } from '@/components/common';

type PostContentProps = {
  content: string;
  title: string;
};

export default function PostContent({ content, title }: PostContentProps) {
  return (
    <div className="mx-auto">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-primary prose-a:underline prose-img:rounded-lg"
        />
      </article>
    </div>
  );
}
