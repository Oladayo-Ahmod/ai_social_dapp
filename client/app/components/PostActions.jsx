import React from 'react';

export default function PostActions({ postId, onLike }) {
  const handleFlagPost = async () => {
    try {
    
      alert("Post flagged successfully!");
    } catch (error) {
      console.error("Failed to flag post:", error);
      alert("There was an error flagging the post.");
    }
  };

  return (
    <div>
      <button className="btn btn-outline-primary me-2" onClick={() => onLike(postId)}>
        Like
      </button>
      <button className="btn btn-outline-danger" onClick={handleFlagPost}>
        Flag
      </button>
    </div>
  );
}
