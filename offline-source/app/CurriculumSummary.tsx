'use client';
import {BookOpen,Copy,ExternalLink} from 'lucide-react';
import {curriculumConnections,curriculumPdfUrl} from '../lib/curriculum';
import {curriculumDetails} from '../lib/curriculum-details';
export function planningNote(id:string){
 const c=curriculumConnections.find(c=>c.id===id),d=curriculumDetails[id];if(!c||!d)return '';
 return `${c.area}: ${c.focus}\nSuggested teaching connection\n\n${d.targets.map(t=>`${t.label}\nKnowledge (paraphrased): ${t.knowledge}\nPractice (paraphrased): ${t.practice}`).join('\n\n')}\n\nPrepare\n${d.preparation}\n\nTeacher-designed example\n${d.example}\n\nEvidence to collect\n${d.evidence}\n\nScope\n${d.boundary}\n\nReference\n${c.locator}\n${curriculumPdfUrl}`;
}
export default function CurriculumSummary({id,onCopy}:{id:string;onCopy:(s:string)=>void}){
 const c=curriculumConnections.find(c=>c.id===id),d=curriculumDetails[id];if(!c||!d)return null;
 return <div className="curriculum-summary"><p className="curriculum-label">Curriculum summaries below are paraphrased. The teaching example and LI/SC are teacher-designed.</p>{d.targets.map(t=><section className="curriculum-target" key={t.label}><h5>{t.label}</h5><div className="knowledge-practice"><div><span>Knowledge to teach</span><p>{t.knowledge}</p></div><div><span>Practice to develop</span><p>{t.practice}</p></div></div></section>)}<div className="curriculum-teach"><strong>Prepare before teaching</strong><p>{d.preparation}</p><strong>A concrete teaching example</strong><p>{d.example}</p><strong>Evidence to collect</strong><p>{d.evidence}</p><p className="curriculum-boundary">{d.boundary}</p></div><div className="curriculum-note-actions"><button className="text-button" onClick={()=>onCopy(planningNote(id))}><Copy size={14}/>Copy planning note</button><a href={c.url} target="_blank" rel="noreferrer"><BookOpen size={14}/>Open included PDF</a></div><a className="curriculum-online" href={`${curriculumPdfUrl}#page=${c.url.split('#page=')[1]}`} target="_blank" rel="noreferrer">Online original <ExternalLink size={11}/></a></div>;
}
