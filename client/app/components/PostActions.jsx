import React from 'react';

export default function PostActions({ postId, onLike, onFlag }) {
  return (
    <div>
      <button className="btn btn-outline-primary me-2" onClick={() => onLike(postId)}>
        Like
      </button>
      <button className="btn btn-outline-danger" onClick={() => onFlag(postId)}>
        Flag
      </button>
    </div>
  );
}
