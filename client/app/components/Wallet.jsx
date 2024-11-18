import React from 'react';
import { useConnect, useDisconnect, useAccount } from '@starknet-react/core';

const WalletBar = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
      {!address ? (
        <div className="flex flex-wrap justify-center gap-2">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="border border-black text-black font-medium py-2 px-4 bg-yellow-300 hover:bg-yellow-500 transition-colors duration-200 rounded"
            >
              Connect {connector.id}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <div className="text-sm bg-gray-200 px-4 py-2 rounded-md text-black">
            Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </div>
          <button
            onClick={() => disconnect()}
            className="border border-black text-black font-medium py-2 px-4 bg-yellow-300 hover:bg-yellow-500 transition-colors duration-200 rounded"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletBar;