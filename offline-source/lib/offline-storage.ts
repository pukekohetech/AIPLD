import {collectionSchema,emptyCollection,saveSchema} from './collection';
const KEY='ai-in-practice-offline-collection-v2';
const LEGACY_KEY='ai-in-practice-offline-collection-v1';
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}});
export function makeOfflineId(){if(typeof crypto.randomUUID==='function')return crypto.randomUUID();return Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,'0')).join('');}
export async function offlineCollectionRequest(_url:string,options?:{method?:string;body?:string;[key:string]:unknown}){
 try{const active=localStorage.getItem(KEY);const saved=active??localStorage.getItem(LEGACY_KEY);let current={collection:emptyCollection,revision:0};if(saved){const parsed=JSON.parse(saved);current={collection:collectionSchema.parse(parsed.collection),revision:parsed.revision};if(!Number.isInteger(current.revision)||current.revision<0)throw new Error('Invalid saved revision');if(active===null)localStorage.setItem(KEY,JSON.stringify({...current,dataVersion:2}));}
 if(options?.method!=='PUT')return json(current);const incoming=saveSchema.safeParse(JSON.parse(options.body||'{}'));if(!incoming.success)return json({error:'Some fields are invalid. Check the example and try again.'},400);if(incoming.data.revision!==current.revision)return json({error:'Your collection changed in another tab. Reload the collection before saving again.'},409);const next={collection:incoming.data.collection,revision:current.revision+1,dataVersion:2};localStorage.setItem(KEY,JSON.stringify(next));return json({revision:next.revision});
 }catch{return json({error:'This browser could not read or save your collection. Check browser storage and keep an exported backup.'},503);}
}
