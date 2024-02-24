import fs from "fs";

const f = JSON.parse(fs.readFileSync('files/proof.json'));
const proof = f.proof;
const inputs = f.inputs;

const pf = `[[${proof.a[0]}, ${proof.a[1]}], [[${proof.b[0][1]}, ${proof.b[0][0]}], [${proof.b[1][1]}, ${proof.b[1][0]}]], [${proof.c[0]}, ${proof.c[1]}]]`;
const ip = `[${inputs[0]}, ${inputs[1]}, ${inputs[2]}, ${inputs[3]}, ${inputs[4]}, ${inputs[5]}]`;

const final = pf + '\n\n' + ip;
fs.writeFileSync('files/solidity_inputs.txt', final);