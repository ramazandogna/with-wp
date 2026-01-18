import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSinglePost } from '@/lib/query/getSinglePost';
import { getPostSlugs } from '@/lib/query/getPostSlugs';
import { getExcerpt } from '@/lib/stripTags';
import PostDetailMain from '@/app/page-sections/post';

// ISR - 1 saat cache
export const revalidate = 3600;

// Static generation için slug'ları üret
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs?.map(({ slug }) => ({ slug })) || [];
}

// SEO metadata oluştur
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getSinglePost(slug);

    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested post could not be found.'
      };
    }

    const description = getExcerpt(post.excerpt, { raw: true });
    const imageUrl = post.featuredImage?.node?.mediaDetails?.sizes?.at(-1)?.sourceUrl;

    return {
      title: post.title,
      description,
      openGraph: {
        title: post.title,
        description,
        images: imageUrl ? [imageUrl] : [],
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: [post.author?.node?.name || 'Anonymous']
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: imageUrl ? [imageUrl] : []
      },
      alternates: {
        canonical: `/${slug}`
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the post.'
    };
  }
}

// Ana sayfa component'i
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    // Post verilerini çek
    const post = await getSinglePost(slug);

    // Post bulunamazsa 404
    if (!post) {
      notFound();
    }

    // Veriyi component'e aktar
    return (
      <div>
        {/* 
        Post Detail Main Section 
        */}
        <PostDetailMain post={post} />
        {/* 
        Related Posts Section
        Not for mvp version
        */}
        {/* <RelatedPosts /> */}
        {/* 
        Post Comment Section
        Not for mvp version
        */}
        {/* <PostComment /> */}
      </div>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }
}
