// GraphQL istek sonucu genel yapısı
export interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: Array<string | number>;
  }>;
}

// API hata tipleri
export interface APIError {
  message: string;
  status?: number;
  code?: string;
}

export type TaxonomyKey = 'categoryName' | 'tag';

export interface TaxonomyFilter {
  key: TaxonomyKey;
  value: string;
}
