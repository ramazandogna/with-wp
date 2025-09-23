'use client';
import { useState } from 'react';
import type { PostResponse } from '@/types/posts';
import { Button } from '@/components/ui';

export function GetMorePost({
  contents,
  setContents,
  taxonomy
}: {
  contents: PostResponse;
  setContents: (posts: PostResponse) => void;
  taxonomy: { key: string | null; value: string | null };
}) {
  const [postsLoading, setPostsLoading] = useState(false);
  const [noMorePost, setNoMorePost] = useState(false);

  const getMorePost = async () => {
    if (postsLoading || noMorePost) return;
    setPostsLoading(true);
    // API route üzerinden fetch ile veri çek
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: '',
        endCursor: contents.pageInfo.endCursor,
        taxonomy
      })
    });
    const morePost = await response.json();
    const updatePosts: PostResponse = {
      pageInfo: morePost.pageInfo,
      nodes: [...contents.nodes, ...morePost.nodes]
    };
    setTimeout(() => {
      setPostsLoading(false);
      setContents(updatePosts);
    }, 400);
    setNoMorePost(!morePost.pageInfo.hasNextPage);
  };

  return (
    <Button
      loading={postsLoading}
      disabled={noMorePost}
      onClick={getMorePost}
      variant="glass"
      size="default"
    >
      {noMorePost ? 'Daha Fazla Yazı Yok' : 'Daha Fazla Getir'}
    </Button>
  );
}
