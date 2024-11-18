"use client"

import React, { useState } from 'react';
import CreatePost from '../app/components/CreatePost';
import PostList from '../app/components/PostList';
import { connectWallet } from '../app/config/starknetConfig';
import Wallet from '@/app/components/Wallet'

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const handleConnectWallet = async () => {
    const account = await connectWallet();
    if (account) alert("Wallet connected!");
  };

  const handlePostCreated = (content) => {
    const newPost = { id: posts.length + 1, author: "You", content };
    // setPosts([newPost, ...posts]);
  };

  const handleLike = (postId) => {
    // Like count using smart contract can be added here
  };

  const handleFlag = async (postId) => {
    // Flag post logic is handled in PostActions.js
  };

  return (
    <div className="container">
      {/* <button className="btn btn-primary my-3" onClick={handleConnectWallet}>
        Connect Wallet
      </button> */}

        <Wallet />
      {/* <CreatePost onPostCreated={handlePostCreated} />
      <PostList posts={posts} onLike={handleLike} onFlag={handleFlag} /> */}
    </div>
  );
}
