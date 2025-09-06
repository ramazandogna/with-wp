// Site sabitleri
export const SITE = {
  NAME: 'WordPress Next.js Blog',
  DESCRIPTION: 'Modern WordPress headless CMS with Next.js',
  URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  AUTHOR: 'Ramazan Doğna',
  KEYWORDS: 'wordpress, nextjs, headless cms, blog',
  LOCALE: 'tr-TR',
  TWITTER_HANDLE: '@ramazandogna'
} as const;

// SEO sabitleri
export const SEO = {
  DEFAULT_TITLE: `${SITE.NAME} - ${SITE.DESCRIPTION}`,
  DEFAULT_DESCRIPTION: SITE.DESCRIPTION,
  DEFAULT_IMAGE: `${SITE.URL}/og-image.jpg`,
  DEFAULT_IMAGE_WIDTH: 1200,
  DEFAULT_IMAGE_HEIGHT: 630,
  TWITTER_CARD_TYPE: 'summary_large_image'
} as const;

// API sabitleri
export const API = {
  GRAPHQL_URL: process.env.GRAPHQL_URL || '',
  DEFAULT_POSTS_PER_PAGE: 10,
  DEFAULT_RELATED_POSTS: 3
} as const;
