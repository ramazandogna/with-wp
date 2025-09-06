import { Metadata } from 'next';
import { SITE, SEO } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = SITE.AUTHOR,
  keywords = SITE.KEYWORDS
}: SEOProps = {}): Metadata {
  const finalTitle = title ? `${title} | ${SITE.NAME}` : SEO.DEFAULT_TITLE;
  const finalDescription = description || SEO.DEFAULT_DESCRIPTION;
  const finalImage = image || SEO.DEFAULT_IMAGE;
  const finalUrl = url || SITE.URL;

  const metadata: Metadata = {
    title: finalTitle,
    description: finalDescription,
    keywords: keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: SITE.NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    openGraph: {
      type: type,
      locale: SITE.LOCALE,
      url: finalUrl,
      title: finalTitle,
      description: finalDescription,
      siteName: SITE.NAME,
      images: [
        {
          url: finalImage,
          width: SEO.DEFAULT_IMAGE_WIDTH,
          height: SEO.DEFAULT_IMAGE_HEIGHT,
          alt: finalTitle
        }
      ]
    },
    // twitter: {
    //   card: SEO.TWITTER_CARD_TYPE,
    //   title: finalTitle,
    //   description: finalDescription,
    //   images: [finalImage],
    //   creator: SITE.TWITTER_HANDLE,
    //   site: SITE.TWITTER_HANDLE
    // },
    alternates: {
      canonical: finalUrl
    },
    metadataBase: new URL(SITE.URL)
  };

  // Article specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [author]
    };
  }

  return metadata;
}

interface StructuredDataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateStructuredData({
  title,
  description,
  image,
  url,
  type = 'WebPage',
  publishedTime,
  modifiedTime,
  author = SITE.AUTHOR
}: StructuredDataProps = {}) {
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title || SITE.NAME,
    description: description || SITE.DESCRIPTION,
    url: url || SITE.URL,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.NAME,
      url: SITE.URL
    },
    image: image || SEO.DEFAULT_IMAGE
  };

  if (publishedTime) {
    structuredData.publishedTime = publishedTime;
  }

  if (modifiedTime) {
    structuredData.modifiedTime = modifiedTime;
  }

  return structuredData;
}
