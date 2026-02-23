import { index } from "../config/pinecone.js";

async function wipeIndex() {
  try {
    console.log("⚠ Deleting all vectors...");

    await index.deleteAll();  // ✅ Correct method

    console.log("✅ All vectors deleted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to delete vectors:", error);
    process.exit(1);
  }
}

wipeIndex();