import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const indexName = "notes-index"; // change if needed

async function createIndex() {
  try {
    const existing = await pc.listIndexes();

    if (existing.indexes.find(i => i.name === indexName)) {
      console.log("⚠️ Index already exists");
      return;
    }

    await pc.createIndex({
      name: indexName,
      dimension: 384,            
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",  
        },
      },
    });

    console.log("✅ Index created successfully");
  } catch (err) {
    console.error("❌ Error creating index:", err.message);
  }
}

createIndex();
