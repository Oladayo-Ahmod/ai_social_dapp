import React, { useState } from 'react';

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    // comment logic here
    setComment('');
  };

  return (
    <div>
      <textarea
        className="form-control mb-2"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="btn btn-primary btn-sm" onClick={handleAddComment}>
        Comment
      </button>
    </div>
  );
}
