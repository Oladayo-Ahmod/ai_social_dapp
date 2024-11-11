import React from 'react';
import { moderationContract, connectWallet } from '../starknetConfig';

export default function PostActions({ postId, onLike }) {
  const handleFlagPost = async () => {
    try {
      const account = await connectWallet();
      if (!account) return;

      const tx = await account.execute({
        contractAddress: moderationContract.address,
        entrypoint: 'flag_post',
        calldata: [postId],
      });

      await provider.waitForTransaction(tx.transaction_hash);
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
