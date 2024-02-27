import { ethers } from "ethers";
import fs from "fs";

const abi = JSON.parse(fs.readFileSync('files/abi.json'));
const contractAddress = "0x6000f6007f83FD8277052550F65226EfFe3A5DfF";
const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org", 11155111);
const signer = new ethers.Wallet("7fe78a6e037ae6314755c163cdc3be598c7ab160f3368107a6cd46f66dc5bdef", provider); // Random private key taken from google
const VerifierContract = new ethers.Contract(contractAddress, abi, signer);

const f = JSON.parse(fs.readFileSync('files/proof.json'));
const proof = f.proof;
const inputs = f.inputs;
const pf = [
    [BigInt(proof.a[0]), BigInt(proof.a[1])],
    [
        [BigInt(proof.b[0][0]), BigInt(proof.b[0][1])],
        [BigInt(proof.b[1][0]), BigInt(proof.b[1][1])]
    ],
    [BigInt(proof.c[0]), BigInt(proof.c[1])]
]
const ip = inputs.map(BigInt);

const result = await VerifierContract.verifyTx(pf, ip);
console.log(result ? "Proof is valid" : "Proof is invalid");