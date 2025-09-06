// Çoklu post listesi için yapı
export interface PostNode {
  databaseId: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    node: {
      name: string;
    };
  };
  featuredImage?: {
    node: {
      mediaDetails: {
        file: string;
        sizes: Array<{
          sourceUrl: string;
          height: number;
          width: number;
        }>;
      };
      altText?: string;
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

// Sayfalama bilgileri
export interface PageInfo {
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
}

// Post listesi ana yapısı
export interface PostResponse {
  nodes: PostNode[];
  pageInfo: PageInfo;
}
