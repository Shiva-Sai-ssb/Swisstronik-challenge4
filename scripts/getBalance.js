const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const sendShieldedQuery = async (provider, destination, data) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(rpcLink, data);
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpcLink, response, usedEncryptedKey);
};

async function main() {
  const contractAddress = "0x8d06C11708107Cc9198bB2a5837273741e489943";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("MyToken");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "balanceOf";
  const ownerAddress = signer.address;
  const responseBalance = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [ownerAddress])
  );

  const decodedBalance = parseInt(contract.interface.decodeFunctionResult(functionName, responseBalance)[0]);
  console.log("Balance of tokens:", decodedBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
