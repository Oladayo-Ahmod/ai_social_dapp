"use client"

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import CreatePost from '../app/components/CreatePost';
import PostList from '../app/components/PostList';
import { useAccount, useCall, useContract, useNetwork, useReadContract, useSendTransaction } from "@starknet-react/core";
import { Abi } from "starknet";
import { ABI } from './abis/postABI';
// import { isError } from 'lodash';


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

  // fetch posts
  const { data: readData, refetch: dataRefetch, isError: readIsError, isLoading: readIsLoading, error: readError } = useReadContract({
    functionName: "get_post",
    args: [1],
    abi: typedABI,
    address: POST_CONTRACT_ADDRESS,
    watch: true,
    refetchInterval: 1000
  });

  // if(readData){
  //   console.log(readData,'data')

  // }
  // console.log(readIsError)
  // create post
  const calls = useMemo(() => {
    if (!userAddress || !contract || !postContent) return [];
    return [contract.populate("create_post", [postContent])];
  }, [contract, userAddress, postContent]);


  const {
    send: writeAsync,
    data: writeData,
    isPending: writeIsPending,
  } = useSendTransaction({
    calls,
  });

  const handlePostCreated = async(content: string) => {

    setPostContent(content)

    writeAsync()

    const newPost = { id: posts.length + 1, author: "You", content };
    setPosts([newPost, ...posts]);
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
      <div className="mt-4">
      <p className={`alert ${writeIsPending ?? "alert-warning"} text-center`}>
        {writeIsPending ?? "Creating Post..."}
      </p>
      {writeData && (
        <p className="alert alert-info text-center">
          Transaction Hash: {writeData.transaction_hash}
        </p>
      )}
    </div>
      {/* <PostList posts={posts} onLike={handleLike} onFlag={handleFlag} />  */}
    </div>
  );
}

export default HomePage
