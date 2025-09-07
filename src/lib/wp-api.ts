/**
 * WordPress API Wrapper - Functional Approach
 * 
 * Bu dosya tüm WordPress GraphQL işlemlerini merkezi bir yerden yönetir.
 * ISR ve SEO optimizasyonu için cache stratejileri içerir.
 */

import {
  PostType,
  PostResponse,
  CategoryDetails,
  PostComments,
  
  GetAllPostsParams,
  GetRelatedPostsParams,
  GetCommentsParams,
  GetCategorySlugsParams,
  GetPostSlugsParams
} from '../types';

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
export const getPosts = async (params: GetAllPostsParams = {}): Promise<PostResponse> => {
  return getAllPosts(params);
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
export const getPostPaths = async (params?: GetPostSlugsParams): Promise<{ slug: string }[] | null> => {
  return getPostSlugs(params);
};

/**
 * İlgili postları getir
 */
export const getRelatedPosts = async (params: GetRelatedPostsParams): Promise<PostResponse> => {
  return getRelatedPostsQuery(params);
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
export const getCategoryPaths = async (params?: GetCategorySlugsParams): Promise<{ slug: string }[] | null> => {
  return getCategorySlugs(params);
};

/**
 * Kategoriye göre postları getir
 */
export const getPostsByCategory = async (
  categorySlug: string,
  options: Omit<GetAllPostsParams, 'taxonomy'> = {}
): Promise<PostResponse> => {
  const params: GetAllPostsParams = {
    ...options,
    taxonomy: { key: 'categoryName', value: categorySlug }
  };
  return getAllPosts(params);
};

// ===== YORUM İŞLEMLERİ =====

/**
 * Post yorumlarını getir
 */
export const getPostComments = async (params: GetCommentsParams): Promise<PostComments> => {
  return getComments(params);
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
  options: Omit<GetAllPostsParams, 'search' | 'taxonomy'> = {}
): Promise<PostResponse> => {
  const params: GetAllPostsParams = {
    ...options,
    search: query,
    taxonomy: null
  };
  return getAllPosts(params);
};

/**
 * Tag'e göre postları getir
 */
export const getPostsByTag = async (
  tagSlug: string,
  options: Omit<GetAllPostsParams, 'taxonomy'> = {}
): Promise<PostResponse> => {
  const params: GetAllPostsParams = {
    ...options,
    taxonomy: { key: 'tag', value: tagSlug }
  };
  return getAllPosts(params);
};

// ===== YARDIMCI FONKSIYONLAR =====

/**
 * Post var mı kontrolü (404 sayfası için)
 */
export const postExists = async (slug: string): Promise<boolean> => {
  try {
    const result = await getPostSlugs({ slug });
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
    const result = await getCategorySlugs({ name });
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
