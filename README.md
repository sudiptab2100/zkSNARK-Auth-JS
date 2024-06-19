# zkSNARK Authentication

- Used ZoKrates library to implement zkSNARK based authentication on EVM blockchain
- Prover can prove to smart contract verifier his knowledge of hash pre-image to authenticate himself

# Groth16 Verifier & Proof Generator (ZoKrates.js)

This is a simple example of how to use ZoKrates.js to generate a proof and verify it using the Groth16 verifier (OnChain - Solidity, OffChain).

## Installation

```bash
npm install
```

## Usage

Generate Prover and Verifier keys & Verifier Smart Contract

```bash
npm run setup
```

Generate Hash Values from `password` and `k`

```bash
npm run generate-hash
```

Generate Proof

```bash
npm run proof
```

Verify Proof (OnChain)

```bash
npm run verify-onchain
```

Verify Proof (OffChain)

```bash
npm run verify-offchain
```
