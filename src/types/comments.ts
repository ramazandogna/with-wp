// getComments fonksiyonu için parametre tipi
export interface GetCommentsParams {
  slug: string;
  startCursor?: string;
}
// Tekil yorum yapısı
export interface CommentNode {
  id: string;
  content: string;
  date: string;
  parentId?: string;
  author: {
    node: {
      name: string;
    };
  };
}

// Yorum sayfalama bilgileri
export interface CommentPageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

// Post yorumları ana yapısı
export interface PostComments {
  commentCount: number;
  comments: {
    nodes: CommentNode[];
    pageInfo: CommentPageInfo;
  };
}

// Yorum ekleme yanıt yapısı

export interface CreateCommentInput {
  author: string;
  authorEmail: string;
  postId: string;
  content: string;
}

export interface CreateCommentResponse {
  createComment: {
    success: boolean;
  };
}