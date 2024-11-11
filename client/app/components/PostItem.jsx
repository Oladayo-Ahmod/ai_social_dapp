import React from 'react';
import PostActions from './PostActions';
import CommentSection from './CommentSection';

export default function PostItem({ post, onLike, onFlag }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.author}</h5>
        <p className="card-text">{post.content}</p>
        <PostActions postId={post.id} onLike={onLike} onFlag={onFlag} />
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
