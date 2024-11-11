import React from 'react';
import PostItem from './PostItem';

export default function PostList({ posts, onLike, onFlag }) {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onLike={onLike} onFlag={onFlag} />
      ))}
    </div>
  );
}
