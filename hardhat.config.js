require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  networks: {
    swisstronik: {
      url:"https://json-rpc.testnet.swisstronik.com/",
      accounts: [PRIVATE_KEY],
    },
  },
};
