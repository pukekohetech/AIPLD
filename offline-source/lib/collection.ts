import { z } from 'zod';
const brief=z.string().trim().max(220);
const long=z.string().max(8000);
const validDate=z.string().min(10).max(50).refine(value=>Number.isFinite(Date.parse(value)), 'Use a valid date.');
export const lessonSchema=z.object({learningIntention:z.string().trim().min(10).max(1000),successCriteria:z.array(z.string().trim().min(5).max(800)).min(2).max(5),evidence:z.string().trim().min(5).max(2500),curriculumConnections:z.array(z.string().max(100)).max(8).default([]),curriculumNote:z.string().max(2500).default('')});
const historySchema=z.object({version:z.number().int().positive(),date:validDate,title:brief,summary:long,prompt:long,notes:long,lesson:lessonSchema.optional()});
export const exampleSchema=z.object({
 id:z.string().min(1).max(100),title:brief.min(3),category:z.enum(['prompts','responsible','assessment','risks','subjects']),
 level:z.enum(['Starting out','Building confidence','Going further']),subject:brief.min(1),years:brief.min(1),
 minutes:z.number().int().min(1).max(180),summary:z.string().trim().min(5).max(3000),
 tags:z.array(z.string().trim().min(1).max(50)).max(12),steps:z.array(z.string().min(1).max(1500)).min(1).max(12),
 prompt:long,check:long,caution:long,sources:z.array(z.string().max(2048)).max(12),
 status:z.enum(['Draft','Tried','Reviewed']).default('Draft'),notes:long.default(''),
 updated:validDate,version:z.number().int().positive(),history:z.array(historySchema).max(10).default([]),lesson:lessonSchema.optional(),
});
export const collectionSchema=z.object({
 examples:z.array(exampleSchema).max(200),bookmarks:z.array(z.string().max(100)).max(300),completed:z.array(z.string().max(100)).max(300),
}).superRefine((c,ctx)=>{if(new Set(c.examples.map(e=>e.id)).size!==c.examples.length)ctx.addIssue({code:'custom',message:'Example IDs must be unique.'});});
export const saveSchema=z.object({revision:z.number().int().min(0),collection:collectionSchema});
export type Collection=z.infer<typeof collectionSchema>;
export const emptyCollection:Collection={examples:[],bookmarks:[],completed:[]};

export function mergeImportedCollection(current:Collection,incoming:Collection,knownIds:string[],newId:()=>string,now:string):Collection {
 const ids=new Map(incoming.examples.map(example=>[example.id,newId()]));
 const known=new Set(knownIds);
 const translate=(id:string)=>ids.get(id)||(known.has(id)?id:undefined);
 const mapped=(values:string[])=>values.map(translate).filter((id):id is string=>!!id);
 return {
  examples:[...incoming.examples.map(example=>({...example,id:ids.get(example.id)!,updated:now})),...current.examples],
  bookmarks:[...new Set([...current.bookmarks,...mapped(incoming.bookmarks)])],
  completed:[...new Set([...current.completed,...mapped(incoming.completed)])],
 };
}
