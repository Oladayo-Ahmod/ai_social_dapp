import React, { useState } from 'react';

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    const response = await fetch('/api/analyzePost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const { analysis } = await response.json();

    if (!analysis.includes("inappropriate")) {
      onPostCreated(content);
      setContent('');
    } else {
      alert("Content may violate platform rules.");
    }
  };

  return (
    <div className="mb-3">
      <textarea
        className="form-control"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleCreatePost}>
        Post
      </button>
    </div>
  );
}
