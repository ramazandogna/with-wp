"use client";
import { useState } from 'react';
import type { PostResponse } from '@/types/posts';
import { LoadingButton } from '@/components/ui/LoadingButton';

export default function GetMorePost({
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
    let updatePosts: PostResponse = {
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
    <LoadingButton
      loading={postsLoading}
      disabled={noMorePost}
      onClick={getMorePost}
      className="mt-6"
    >
      {noMorePost ? 'Daha Fazla Yazı Yok' : 'Daha Fazla Yazı Göster'}
    </LoadingButton>
  );
}
