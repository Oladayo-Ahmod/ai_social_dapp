import { Account, CallData, Contract, RpcProvider, stark } from "starknet";
import * as dotenv from "dotenv";
import { getCompiledCode } from "./utils";
dotenv.config();

async function deployContract(
  account: Account,
  contractName: string,
  provider: RpcProvider
) {
  let sierraCode, casmCode;

  try {
    ({ sierraCode, casmCode } = await getCompiledCode(contractName));
  } catch (error: any) {
    console.error(`Failed to read contract files for ${contractName}`);
    process.exit(1);
  }

  const myCallData = new CallData(sierraCode.abi);
  const constructor = myCallData.compile("constructor", {
    // Add constructor parameters here if needed
  });

  const deployResponse = await account.declareAndDeploy({
    contract: sierraCode,
    casm: casmCode,
    constructorCalldata: constructor,
    salt: stark.randomAddress(),
  });

  const deployedContract = new Contract(
    sierraCode.abi,
    deployResponse.deploy.contract_address,
    provider
  );

  console.log(
    `✅ ${contractName} deployed at address: ${deployedContract.address}`
  );

  return deployedContract;
}

async function main() {
  const provider = new RpcProvider({
    nodeUrl: process.env.RPC_ENDPOINT,
  });

  // Initialize existing predeployed account 0
  console.log("ACCOUNT_ADDRESS=", process.env.DEPLOYER_ADDRESS);
  console.log("ACCOUNT_PRIVATE_KEY=", process.env.DEPLOYER_PRIVATE_KEY);
  const privateKey0 = process.env.DEPLOYER_PRIVATE_KEY ?? "";
  const accountAddress0: string = process.env.DEPLOYER_ADDRESS ?? "";
  const account0 = new Account(provider, accountAddress0, privateKey0);
  console.log("Account connected.\n");

  // Contracts to deploy
  const contractNames = [
    "social_ai_Moderation",
    "social_ai_Post",
    "social_ai_UserProfile",
  ];

  for (const contractName of contractNames) {
    console.log(`Deploying ${contractName}...`);
    await deployContract(account0, contractName, provider);
  }

  console.log("\n🎉 All contracts deployed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
