import { initialize } from "zokrates-js";
import fs from "fs";

const fileSystemResolver = (from) => {
  const source = fs.readFileSync(from).toString();
  return source;
};

// create folder for storing files
const folderName = "files";
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
  console.log(`Folder '${folderName}' created successfully.`);
}

initialize().then((zokratesProvider) => {
  const source = fileSystemResolver("src/code.zok");
  const artifacts = zokratesProvider.compile(source);
  console.info("[1] Compilation Done.");

  // run setup
  const keypair = zokratesProvider.setup(artifacts.program);
  console.info("[2] Setup Done.");
  const pk = keypair.pk;
  const vk = keypair.vk;

  // store verifier key and proving key
  fs.writeFileSync("files/vk.json", JSON.stringify(vk, null, 4));
  console.info("[3] Verifier Key Stored.");
  fs.writeFileSync("files/pk.bin", pk);
  console.info("[4] Proving Key Stored.");

  // export solidity verifier
  const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);
  fs.writeFileSync("files/verifier.sol", verifier);
  console.info("[5] Verifier Contract Stored.");
});
