// RAG stubs usando interfaces mínimas; troque por Pinecone/Weaviate depois
export interface Doc { id: string; text: string }
const mem: Doc[] = []

export async function addDoc(d: Doc){ mem.push(d); return d }
export async function search(query: string){
  return mem.filter(d=>d.text.toLowerCase().includes(query.toLowerCase())).slice(0,5)
}
