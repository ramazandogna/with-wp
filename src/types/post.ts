// Tekil post yapısı
export interface PostType {
  databaseId: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  commentCount: number;
  author: {
    node: {
      name: string;
    };
  };
  featuredImage?: {
    node: {
      mediaDetails: {
        sizes: Array<{
          sourceUrl: string;
          width: number;
          height: number;
        }>;
      };
      altText?: string;
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
      link: string;
    }>;
  };
}
