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
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getSinglePost(params.slug);
    
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
        canonical: `/${params.slug}`
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
export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    // Post verilerini çek
    const post = await getSinglePost(params.slug);
    
    // Post bulunamazsa 404
    if (!post) {
      notFound();
    }

    // Veriyi component'e aktar
    return (
      <PostDetailMain 
        post={post}
      />
    );
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }
}
