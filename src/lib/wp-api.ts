/**
 * WordPress API Wrapper - Functional Approach
 * 
 * Bu dosya tüm WordPress GraphQL işlemlerini merkezi bir yerden yönetir.
 * ISR ve SEO optimizasyonu için cache stratejileri içerir.
 */

import { PostType, PostResponse, CategoryDetails, PostComments, TaxonomyFilter } from '../types';
import { API } from '../constants';

// Tüm lib fonksiyonlarını index'ten import et
import {
  getAllPosts,
  getSinglePost,
  getPostSlugs,
  getCategoryDetails,
  getCategorySlugs,
  getComments,
  createComment,
  getRelatedPosts as getRelatedPostsQuery
} from './query';

// ===== POST İŞLEMLERİ =====

/**
 * Tüm postları getir (sayfalama ile)
 * ISR için optimize edilmiş
 */
export const getPosts = async (options: {
  cursor?: string;
  taxonomy?: TaxonomyFilter | null;
  limit?: number;
  search?: string | null;
} = {}): Promise<PostResponse> => {
  const { 
    cursor = '', 
    taxonomy = null, 
    limit = API.DEFAULT_POSTS_PER_PAGE, 
    search = null 
  } = options;
  
  return getAllPosts(cursor, taxonomy, limit, search);
};

/**
 * Tekil post getir
 * Static generation için optimize edilmiş
 */
export const getPost = async (slug: string): Promise<PostType> => {
  return getSinglePost(slug);
};

/**
 * Post slug'larını getir (generateStaticParams için)
 */
export const getPostPaths = async (slug?: string): Promise<{ slug: string }[] | null> => {
  return getPostSlugs(slug);
};

/**
 * İlgili postları getir
 */
export const getRelatedPosts = async (options: {
  categorySlugs: string[];
  excludeSlug: string;
  cursor?: string;
  limit?: number;
}): Promise<PostResponse> => {
  const { categorySlugs, excludeSlug, cursor = '', limit = API.DEFAULT_RELATED_POSTS } = options;
  return getRelatedPostsQuery(cursor, categorySlugs, limit, excludeSlug);
};

// ===== KATEGORİ İŞLEMLERİ =====

/**
 * Kategori detaylarını getir
 */
export const getCategory = async (slug: string): Promise<CategoryDetails> => {
  return getCategoryDetails(slug);
};

/**
 * Kategori slug'larını getir (generateStaticParams için)
 */
export const getCategoryPaths = async (name?: string): Promise<{ slug: string }[] | null> => {
  return getCategorySlugs(name);
};

/**
 * Kategoriye göre postları getir
 */
export const getPostsByCategory = async (
  categorySlug: string,
  options: {
    cursor?: string;
    limit?: number;
  } = {}
): Promise<PostResponse> => {
  const { cursor = '', limit = API.DEFAULT_POSTS_PER_PAGE } = options;
  const taxonomy: TaxonomyFilter = { key: 'categoryName', value: categorySlug };
  return getAllPosts(cursor, taxonomy, limit);
};

// ===== YORUM İŞLEMLERİ =====

/**
 * Post yorumlarını getir
 */
export const getPostComments = async (
  slug: string, 
  cursor?: string
): Promise<PostComments> => {
  return getComments(slug, cursor);
};

/**
 * Yeni yorum oluştur
 */
export const submitComment = async (commentData: {
  author: string;
  authorEmail: string;
  postId: string;
  content: string;
}) => {
  return createComment({ body: commentData });
};

// ===== ARAMA İŞLEMLERİ =====

/**
 * Arama sonuçlarını getir
 */
export const searchPosts = async (
  query: string,
  options: {
    cursor?: string;
    limit?: number;
  } = {}
): Promise<PostResponse> => {
  const { cursor = '', limit = API.DEFAULT_POSTS_PER_PAGE } = options;
  return getAllPosts(cursor, null, limit, query);
};

/**
 * Tag'e göre postları getir
 */
export const getPostsByTag = async (
  tagSlug: string,
  options: {
    cursor?: string;
    limit?: number;
  } = {}
): Promise<PostResponse> => {
  const { cursor = '', limit = API.DEFAULT_POSTS_PER_PAGE } = options;
  const taxonomy: TaxonomyFilter = { key: 'tag', value: tagSlug };
  return getAllPosts(cursor, taxonomy, limit);
};

// ===== YARDIMCI FONKSIYONLAR =====

/**
 * Post var mı kontrolü (404 sayfası için)
 */
export const postExists = async (slug: string): Promise<boolean> => {
  try {
    const result = await getPostSlugs(slug);
    return result !== null && result.length > 0;
  } catch {
    return false;
  }
};

/**
 * Kategori var mı kontrolü
 */
export const categoryExists = async (name: string): Promise<boolean> => {
  try {
    const result = await getCategorySlugs(name);
    return result !== null && result.length > 0;
  } catch {
    return false;
  }
};

// ===== DEFAULT EXPORT - TÜM API FONKSİYONLARI =====

/**
 * WordPress API fonksiyonlarının toplu exportu
 * 
 * Kullanım 1 (Named imports):
 * import { getPosts, getPost } from '@/lib/wp-api'
 * 
 * Kullanım 2 (Default import):
 * import wp from '@/lib/wp-api'
 * wp.getPosts()
 */
const wp = {
  // Posts
  getPosts,
  getPost,
  getPostPaths,
  getRelatedPosts,
  
  // Categories
  getCategory,
  getCategoryPaths,
  getPostsByCategory,
  
  // Comments
  getPostComments,
  submitComment,
  
  // Search & Tags
  searchPosts,
  getPostsByTag,
  
  // Utilities
  postExists,
  categoryExists,
} as const;

export default wp;
