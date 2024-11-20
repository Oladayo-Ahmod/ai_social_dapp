import React from 'react';
import { useConnect, useDisconnect, useAccount } from '@starknet-react/core';

const WalletBar = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <div className="d-flex flex-column align-items-center p-4 bg-light border rounded shadow">
      {!address ? (
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="btn btn-warning text-dark fw-medium px-4 py-2 m-2"
            >
              Connect {connector.id}
            </button>
          ))}
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <div className="alert alert-secondary text-dark text-center fw-medium py-2 mb-3">
            Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </div>
          <button
            onClick={() => disconnect()}
            className="btn btn-warning text-dark fw-medium px-4 py-2"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletBar;
