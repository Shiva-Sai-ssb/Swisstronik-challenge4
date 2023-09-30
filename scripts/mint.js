const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/swisstronik.js");

async function sendShieldedTransaction(signer, destination, data, value) {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
}

async function main() {
  const contractAddress = "0x8d06C11708107Cc9198bB2a5837273741e489943";
  const [signer] = await hre.ethers.getSigners();

  const contract = await hre.ethers.getContractAt(
    "MyToken",
    contractAddress
  );

  const functionName = "mintTokens";
  const mintTokens = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName),
    0
  );

  await mintTokens.wait();
  console.log("Transaction Receipt:", mintTokens);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
