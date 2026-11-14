'use client';
import {Check,Copy,GraduationCap,ChevronDown,ExternalLink,Target} from 'lucide-react';
import {curriculumConnections,curriculumLocalPdfUrl} from '../lib/curriculum';
import CurriculumSummary from './CurriculumSummary';
import type {LessonPlan} from '../lib/lesson-plans';
export function lessonText(title:string,lesson:LessonPlan){return `${title}\n\nLearning intention (LI)\n${lesson.learningIntention}\n\nSuccess criteria (SC)\n${lesson.successCriteria.map(s=>`• ${s}`).join('\n')}`;}
export default function LessonPanel({title,lesson,onCopy}:{title:string;lesson:LessonPlan;onCopy:(text:string)=>void}){
 const connections=lesson.curriculumConnections.map(id=>curriculumConnections.find(c=>c.id===id)).filter(c=>!!c);
 return <section className="lesson-panel" aria-label="Lesson learning intention and success criteria">
  <div className="lesson-panel-title"><span><GraduationCap size={17}/>Student lesson activity</span><button className="text-button" onClick={()=>onCopy(lessonText(title,lesson))}><Copy size={14}/>Copy LI & SC</button></div>
  <div className="lesson-learning-grid"><div className="lesson-li"><span className="eyebrow muted">LEARNING INTENTION (LI)</span><p>{lesson.learningIntention}</p></div><div className="lesson-sc"><span className="eyebrow muted">SUCCESS CRITERIA (SC)</span><ul>{lesson.successCriteria.map((criterion,i)=><li key={i}><Check size={15}/><span>{criterion}</span></li>)}</ul></div></div>
  <div className="lesson-evidence"><Target size={18}/><div><h3>Evidence of learning</h3><p>{lesson.evidence}</p></div></div>
  <details className="curriculum-panel"><summary>Suggested curriculum connections <ChevronDown size={15}/></summary><div className="curriculum-content"><p className="curriculum-scope">These LI and SC were written for this activity. Connections to the final NZC 2026 content are teacher suggestions, rather than Ministry-endorsed mappings or evidence that a full teaching sequence is covered.</p>{connections.map(connection=><article className="curriculum-connection" key={connection.id}><div><strong>{connection.area}</strong><span>{connection.scope}</span></div><h4>{connection.focus}</h4><p>{connection.note}</p><details className="connection-detail"><summary>Knowledge, practice & teaching example <ChevronDown size={14}/></summary><CurriculumSummary id={connection.id} onCopy={onCopy}/></details><a href={connection.url} target="_blank" rel="noreferrer">{connection.locator}<ExternalLink size={12}/></a></article>)}<p className="curriculum-adapt-note">{lesson.curriculumNote}</p><a className="curriculum-original" href={curriculumLocalPdfUrl} target="_blank" rel="noreferrer">Open the included full curriculum PDF <ExternalLink size={12}/></a><small>Checked 15 November 2026. These links open the included PDF. Keep the references folder beside index.html. Years 11–13 adaptations need a separate subject and assessment check.</small></div></details>
 </section>;
}
