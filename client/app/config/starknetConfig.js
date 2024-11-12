import { Provider, Contract, Account } from 'starknet';

// moderation contract's ABI 
import moderationABI  from '../abis/moderationABI.json';

// provider and contract configurations
const provider = new Provider({ sequencer: { network: 'goerli-alpha' } }); // 

// contract address
const MODERATION_CONTRACT_ADDRESS = "";

export const moderationContract = new Contract(moderationABI, MODERATION_CONTRACT_ADDRESS, provider);

export async function connectWallet() {
  const starknet = window.starknet;

  if (!starknet) {
    alert("Starknet wallet not found. Please install one.");
    return;
  }

  await starknet.enable({ starknetVersion: 'v4' });
  const account = new Account(starknet.provider, starknet.selectedAddress, starknet.signer);

  return account;
}
