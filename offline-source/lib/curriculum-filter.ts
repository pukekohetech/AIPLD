import {curriculumConnections} from './curriculum';
import {curriculumDetails} from './curriculum-details';
export function findCurriculumConnections(query='',area='all',year='all'){
 return curriculumConnections.filter(c=>{
  const d=curriculumDetails[c.id];if(!d)return false;
  if(area!=='all'&&c.area!==area)return false;
  if(year==='stage'&&!d.targets.some(t=>!t.years.length))return false;
  if(['9','10'].includes(year)&&!d.targets.some(t=>t.years.includes(Number(year))))return false;
  const text=[c.area,c.focus,c.locator,...d.targets.flatMap(t=>[t.label,t.knowledge,t.practice]),d.example].join(' ').toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).every(q=>text.includes(q));
 });
}

export function matchesCurriculumYear(years:string,selected:string){
 if(!['9','10'].includes(selected))return true;
 const bounds=(years.match(/\d+/g)||[]).map(Number);return !bounds.length||(Number(selected)>=bounds[0]&&Number(selected)<=bounds[bounds.length-1]);
}
