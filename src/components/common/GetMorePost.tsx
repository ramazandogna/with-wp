'use client';
//react
import { memo, useState, useCallback } from 'react';
//components
import { Button } from '@/components/ui';
//types
import type { PostResponse } from '@/types/posts';

export const GetMorePost = memo(function GetMorePost({
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

  const getMorePost = useCallback(async () => {
    if (postsLoading || noMorePost) return;
    setPostsLoading(true);

    try {
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

      setContents(updatePosts);
      setNoMorePost(!morePost.pageInfo.hasNextPage);
    } finally {
      setPostsLoading(false);
    }
  }, [contents.pageInfo.endCursor, contents.nodes, taxonomy, setContents, postsLoading, noMorePost]);

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
});
