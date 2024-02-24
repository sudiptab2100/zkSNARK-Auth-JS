import { initialize } from "zokrates-js";
import fs from "fs";

const fileSystemResolver = (from) => {
  const source = fs.readFileSync(from).toString();
  return source;
};

initialize().then((zokratesProvider) => {
  const source = fileSystemResolver("src/code.zok");
  const artifacts = zokratesProvider.compile(source);
  console.info("[1] Compilation Done.");

  // computation
  const hash_data = JSON.parse(fs.readFileSync("files/hash_data.json"));
  const { witness, output } = zokratesProvider.computeWitness(artifacts, [
    hash_data.a, // a
    hash_data.b, // b
    hash_data.c, // c
    hash_data.k, // k
    hash_data.h, // h = sha256([a, b, c, 0])
    hash_data.hh, // hh = sha256([a, b, c, k])
  ]);
  console.log("[2] Witness Generated.");

  if (!output) {
    console.error("[ERROR] Invalid Input.");
    process.exit(1);
  }

  const pk = new Uint8Array(fs.readFileSync("files/pk.bin"));
  console.log("[3] Proving Key Loaded.");

  // generate proof
  const proof = zokratesProvider.generateProof(artifacts.program, witness, pk);
  console.log("[4] Proof Generated.");

  fs.writeFileSync("files/proof.json", JSON.stringify(proof, null, 4));
  console.log("[5] Proof Stored.");
});
