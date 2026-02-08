#!/usr/bin/env node
/**
 * Upload video to Irys (Arweave permanent storage)
 * Run: node upload-to-irys.js
 */

const Irys = require("@irys/sdk");
const fs = require("fs");
const path = require("path");

const PRIVATE_KEY = "06da2e1158b524adebddfa182da5fe825bc8fe754888ce20a2f032f4046b6191";
const VIDEO_PATH = "/Users/gs/Desktop/Screen Recording 2026-01-22 at 08.10.22.mov";

async function main() {
  console.log("🚀 Connecting to Irys...");

  // Use devnet for testing (free), or "mainnet" for permanent storage
  const irys = new Irys({
    network: "devnet", // Change to "mainnet" for permanent storage
    token: "ethereum",
    key: PRIVATE_KEY,
    config: { providerUrl: "https://eth-sepolia.g.alchemy.com/v2/alcht_YbDiff1KAqK0fNAzBgycHfz7G0iz4n" }
  });

  console.log(`📁 Reading video: ${VIDEO_PATH}`);
  const fileSize = fs.statSync(VIDEO_PATH).size;
  console.log(`📊 File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);

  // Check price
  const price = await irys.getPrice(fileSize);
  console.log(`💰 Upload cost: ${irys.utils.fromAtomic(price)} ETH`);

  // Check balance
  const balance = await irys.getLoadedBalance();
  console.log(`💳 Wallet balance: ${irys.utils.fromAtomic(balance)} ETH`);

  if (balance < price) {
    console.log("\n⚠️  Insufficient balance. Funding wallet...");
    // Fund with slightly more than needed
    const fundAmount = price * BigInt(110) / BigInt(100); // +10%
    await irys.fund(fundAmount);
    console.log("✅ Wallet funded!");
  }

  console.log("\n📤 Uploading video to Irys...");
  const tags = [
    { name: "Content-Type", value: "video/quicktime" },
    { name: "Title", value: "UMO Live Archive - Screen Recording" },
    { name: "App-Name", value: "OffsetWorks" }
  ];

  const receipt = await irys.uploadFile(VIDEO_PATH, { tags });

  console.log("\n✅ Upload complete!");
  console.log(`📍 Transaction ID: ${receipt.id}`);
  console.log(`🔗 Gateway URL: https://gateway.irys.xyz/${receipt.id}`);
  console.log(`🔗 Arweave URL: https://arweave.net/${receipt.id}`);

  // Save URL to file for reference
  const urlFile = path.join(__dirname, "irys-video-url.txt");
  fs.writeFileSync(urlFile, `https://gateway.irys.xyz/${receipt.id}`);
  console.log(`\n💾 URL saved to: ${urlFile}`);
}

main().catch(console.error);
