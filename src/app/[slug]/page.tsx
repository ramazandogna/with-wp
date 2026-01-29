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

    const seo = post.seo;
    const fallbackDescription = getExcerpt(post.excerpt, { raw: true });
    const featuredImageData = post.featuredImage?.node?.mediaDetails?.sizes?.at(-1);
    const imageUrl = featuredImageData?.sourceUrl;
    const imageWidth = featuredImageData?.width || 1200;
    const imageHeight = featuredImageData?.height || 630;

    // Environment'dan site URL'ı al
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ramazandogna.com';
    const authorName = post.author?.node?.name?.toLowerCase().replace(/\s+/g, '-') || 'anonymous';
    const authorUrl = `${SITE_URL}/author/${authorName}`;

    // Meta title: Yoast SEO > Post Title
    const metaTitle = seo?.title || post.title;

    // Meta description: Yoast SEO > Excerpt fallback
    const metaDescription = seo?.metaDesc || fallbackDescription;

    // OpenGraph title: Yoast OG Title > Meta Title > Post Title
    const ogTitle = seo?.opengraphTitle || metaTitle;

    // OpenGraph description: Yoast OG Desc > Meta Desc > Excerpt
    const ogDescription = seo?.opengraphDescription || metaDescription;

    // Canonical URL: Site URL + Slug (Yoast URL'sini görmezden gel)
    const canonicalUrl = `${SITE_URL}/${slug}`;

    // Published/Modified times: Yoast > Post dates
    const publishedTime = seo?.opengraphPublishedTime || post.date;
    const modifiedTime = seo?.opengraphModifiedTime || post.modified;

    return {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: canonicalUrl,
        siteName: seo?.opengraphSiteName || undefined,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: imageWidth,
                height: imageHeight,
                alt: metaTitle
              }
            ]
          : [],
        type: 'article',
        publishedTime,
        modifiedTime,
        authors: [authorUrl]
      },
      twitter: {
        card: 'summary_large_image',
        title: ogTitle,
        description: ogDescription,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                alt: metaTitle
              }
            ]
          : []
      },
      alternates: {
        canonical: canonicalUrl
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
  const { slug } = await params;

  // Post verilerini çek
  const post = await getSinglePost(slug);

  // Post bulunamazsa 404
  if (!post) {
    notFound();
  }

  // Environment'dan site URL'ı al
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ramazandogna.com';
  const authorName = post.author?.node?.name?.toLowerCase().replace(/\s+/g, '-') || 'anonymous';
  const authorUrl = `${SITE_URL}/author/${authorName}`;
  const postUrl = `${SITE_URL}/${post.slug}`;

  // Veriyi component'e aktar
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.seo?.title || post.title,
            description: post.seo?.metaDesc || getExcerpt(post.excerpt, { raw: true }),
            image: post.featuredImage?.node?.mediaDetails?.sizes?.at(-1)?.sourceUrl || '',
            datePublished: post.seo?.opengraphPublishedTime || post.date,
            dateModified: post.seo?.opengraphModifiedTime || post.modified,
            author: {
              '@type': 'Person',
              name: post.author?.node?.name || 'Anonymous',
              url: authorUrl
            },
            publisher: {
              '@type': 'Organization',
              name: post.seo?.opengraphSiteName || 'CMS API',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': postUrl
            },
            ...(post.seo?.readingTime && {
              timeRequired: `PT${post.seo.readingTime}M`
            })
          })
        }}
      />

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
    </>
  );
}
