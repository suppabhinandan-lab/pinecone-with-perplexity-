import { index } from "../config/pinecone.js";
import { getEmbedder } from "../config/embedder.js";

// export async function storeText(id, text) {
//   const embedder = await getEmbedder();
//   const emb = await embedder(text, { pooling: "mean", normalize: true });

//   await index.upsert([{
//     id,
//     values: Array.from(emb.data),
//     metadata: { text },
//   }]);
// }

export async function storeDocument(documents){
   const embedder = await getEmbedder();
   const vectors=await Promise.all(documents.map(async doc=>{
    const emb = await embedder(doc.text,{pooling: "mean", normalize:true});
    return{
      id:doc.id,
      values:Array.from(emb.data),
      metadata: { text: doc.text, category: doc.category, },
    }
   }))
   await index.upsert(vectors); 
   console.log("✅ All documents stored in Pinecone");
}

export async function searchText(query) {
  const embedder = await getEmbedder();
  const emb = await embedder(query, { pooling: "mean", normalize: true });

  const res = await index.query({
    vector: Array.from(emb.data),
    topK: 3,
    includeMetadata: true,
  });

  return res.matches.map(m => m.metadata.text).join("\n");
}