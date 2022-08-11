import "@nomiclabs/hardhat-waffle";
require('dotenv').config()

/** 
 @type import('hardhat/config').HardhatUserConfig  
**/

export const paths = {
  sources: "./hardhat/contracts",
  tests: "./hardhat/test",
  cache: "./hardhat/cache",
  artifacts: "./hardhat/artifacts"
};
export const defaultNetwork = "kovan";
export const networks = {
  hardhat: {
    // If want to do some forking, uncomment this
    // forking: {
    //  url: MAINNET_RPC_URL
    // }
  },
  localhost: {},
  kovan: {
    url: process.env.KOVAN_RPC_URL,
    accounts: [process.env.PRIVATE_KEY],
    saveDeployments: true,
  }
};
export const solidity = "0.8.9";
