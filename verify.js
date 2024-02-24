import { initialize } from "zokrates-js";
import fs from "fs";

initialize().then((zokratesProvider) => {
  const vk = JSON.parse(fs.readFileSync("files/vk.json").toString());
  const proof = JSON.parse(fs.readFileSync("files/proof.json").toString());
  // Verify off-chain
  const isVerified = zokratesProvider.verify(vk, proof);
  console.log(isVerified ? "Verified" : "Not Verified");
});
