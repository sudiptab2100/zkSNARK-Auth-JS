import { initialize } from "zokrates-js";
import fs from "fs";

const fileSystemResolver = (from) => {
  const source = fs.readFileSync(from).toString();
  return source;
};

initialize().then((zokratesProvider) => {
  const source = fileSystemResolver("code.zok");
  const artifacts = zokratesProvider.compile(source);
  console.info("[1] Compilation Done.");

  // computation
  const { witness, output } = zokratesProvider.computeWitness(artifacts, [
    "0", // a
    "0", // b
    "0", // c
    "0", // k
    [
      // sha256([a, b, c, 0])
      "326522724692461750427768532537390503835",
      "89059515727727869117346995944635890507",
    ],
    [
      // sha256([a, b, c, k])
      "326522724692461750427768532537390503835",
      "89059515727727869117346995944635890507",
    ],
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
