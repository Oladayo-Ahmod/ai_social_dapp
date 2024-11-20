'use client';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAccount, useBalance, useBlockNumber, useContract, useReadContract, useSendTransaction, useTransactionReceipt } from '@starknet-react/core';
import { BlockNumber, Contract, RpcProvider } from "starknet";
import { ABI } from '../abis/postABI';
import { Abi } from "starknet";
import { formatAmount, shortenAddress } from '../utils/helpers';

 const CreatePost=({ onPostCreated })=>{
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    if(content.trim()){
      await onPostCreated(content);
      setContent("")
    }

    // const response = await fetch('/api/analyzePost', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ content }),
    // });
    // const { analysis } = await response.json();

    // if (!analysis.includes("inappropriate")) {
    //   // onPostCreated(content);
    //   setContent('');
    // } else {
    //   alert("Content may violate platform rules.");
    // }
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

export default CreatePost