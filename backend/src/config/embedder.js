import { pipeline } from "@xenova/transformers";
// import { documents } from "./data";

let embedder;

export async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}
