// SEO ile ilgili tüm tipler burada tutulur.

export interface SEOProps {
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

// Yoast SEO WordPress GraphQL API'den gelen SEO verileri
export interface YoastSEO {
  title: string | null;
  metaDesc: string | null;
  opengraphTitle: string | null;
  opengraphDescription: string | null;
  opengraphUrl: string | null;
  opengraphType: string | null;
  opengraphSiteName: string | null;
  opengraphPublisher: string | null;
  opengraphPublishedTime: string | null;
  opengraphModifiedTime: string | null;
  readingTime: number | null;
}

export interface StructuredDataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    url: string;
  };
  image: string;
  publishedTime?: string;
  modifiedTime?: string;
}
