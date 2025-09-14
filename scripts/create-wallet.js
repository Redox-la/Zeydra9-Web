// scripts/create-wallet.js
const { Wallet } = require("ethers");

const w = Wallet.createRandom();
console.log("Address:", w.address);
console.log("Private key:", w.privateKey);