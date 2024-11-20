"use client"

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import CreatePost from '../app/components/CreatePost';
import PostList from '../app/components/PostList';
import { connectWallet } from '../app/config/starknetConfig';
import { useAccount, useCall, useContract, useNetwork, useSendTransaction } from "@starknet-react/core";
import { Abi } from "starknet";
import { ABI } from './abis/postABI';


const Wallet = dynamic(() => import('@/app/components/Wallet'), { ssr: false })
const POST_CONTRACT_ADDRESS = "0x627a2a34b062349646f04749bcc7106f31af3232680658686d457960e47867c"

 const HomePage : FC = ()=>{
  const [posts, setPosts] = useState([]);
  const [postContent , setPostContent] = useState<string>()

  const { chain } = useNetwork();

  const { address: userAddress } = useAccount();

  const typedABI = ABI as Abi;

  const { contract } = useContract({
    abi: typedABI,
    address: POST_CONTRACT_ADDRESS,
  });

  
  const calls = useMemo(() => {
    if (!userAddress || !contract) return [];
    return [contract.populate("create_post", [postContent])];
  }, [contract, userAddress, postContent]);

  if (!postContent) return

  const {
    send: writeAsync,
    data: writeData,
    isPending: writeIsPending,
  } = useSendTransaction({
    calls,
  });

  const handleConnectWallet = async () => {
    const account = await connectWallet();
    if (account) alert("Wallet connected!");
  };

  const handlePostCreated = (content: string) => {
    setPostContent(content)

    writeAsync()

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
      <CreatePost onPostCreated={handlePostCreated} />
      {/* <PostList posts={posts} onLike={handleLike} onFlag={handleFlag} />  */}
    </div>
  );
}

export default HomePage
