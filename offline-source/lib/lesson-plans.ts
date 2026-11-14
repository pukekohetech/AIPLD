export type LessonPlan = {
 learningIntention:string;
 successCriteria:string[];
 evidence:string;
 curriculumConnections:string[];
 curriculumNote:string;
};
export type CurriculumConnection = {
 id:string; area:string; focus:string; scope:string; locator:string;
 url:string; note:string;
};
// Teacher-created learning intentions and criteria. Curriculum connections are
// suggestions to verify against the content taught, not official endorsements.
const l=(learningIntention:string,successCriteria:string[],evidence:string,curriculumConnections:string[],curriculumNote='Adapt the task and sources to the knowledge your class is learning. The suggested links show a relevant connection, not coverage of a whole curriculum sequence.'):LessonPlan=>({learningIntention,successCriteria,evidence,curriculumConnections,curriculumNote});
const senior='Senior adaptation: these LI and SC can support practice in Years 11–13. No specific Years 11–13 curriculum or NCEA standard alignment has been verified. Choose the subject knowledge, check current requirements and adjust the criteria before teaching.';
export const lessonPlans:Record<string,LessonPlan>={
 socratic:l('We are learning to develop and justify a position by answering questions and considering evidence.',[
  'I can state my initial position and give a reason for it.',
  'I can answer a follow-up question with relevant evidence or a clear example.',
  'I can explain whether my position changed and justify my final response in my own words.',
 ],'Collect the first response and a short final response to a fresh question. Ask the student to point to one change in their thinking.',['english-discussion']),
 feedback:l('We are learning to improve a practice response by using feedback linked to a clear learning criterion.',[
  'I can identify one strength and one gap in my response using the supplied criterion.',
  'I can choose a useful feedback question and make my own revision.',
  'I can explain how the revision improves the response, using evidence from both versions.',
 ],'Keep the original response, the student’s revision and a one-sentence explanation linked to the criterion.',['english-writing']),
 'bounded-sources':l('We are learning to support claims with relevant evidence from supplied sources.',[
  'I can match a claim to the exact passage that supports it.',
  'I can identify a claim that the supplied source does not support.',
  'I can write a conclusion that reflects the evidence and acknowledges what remains uncertain.',
 ],'Collect a claim–evidence table and one independently written conclusion. Check quotations against the supplied original.',['english-critical']),
 contrast:l('We are learning to test a claim by considering counterexamples and the evidence needed to decide.',[
  'I can explain my claim and identify an assumption it relies on.',
  'I can describe a plausible counterexample and check the evidence behind it.',
  'I can qualify or defend my claim using evidence rather than the confidence of an AI response.',
 ],'Collect the initial claim, a checked counterexample and a revised or defended claim with a reason.',[],senior),
 'first-lesson':l('We are learning to evaluate the usefulness and accuracy of an AI explanation.',[
  'I can compare an AI explanation with my own initial thinking.',
  'I can use a teacher-provided source to check one claim and explain the result.',
  'I can give a final explanation in my own words and identify one limit of the AI response.',
 ],'Collect the student’s first explanation, one source check and their independent final explanation.',['english-critical','technology-ai']),
 'traffic-lights':l('We are learning to justify which kinds of AI assistance are appropriate for a particular learning task.',[
  'I can use the supplied task rules to classify three examples of AI assistance.',
  'I can explain one classification by referring to the work the learner must do independently.',
  'I can identify an unclear case and state who I would ask before using AI.',
 ],'Use three fictional cases and an exit ticket: one permitted use, one boundary and one question to clarify. Provide the actual task rules first.',['technology-ai']),
 disclosure:l('We are learning to explain and acknowledge the AI assistance used in a practice task.',[
  'I can record the tool, date and purpose of the help I used.',
  'I can identify what I kept, changed or rejected and what I checked against a source.',
  'I can explain which decisions and work I completed independently.',
 ],'Collect a brief AI-use note alongside the practice work. Ask the learner to explain one decision; the note alone is not evidence of authenticity.',['english-ethical','technology-ai']),
 privacy:l('We are learning to recognise information that could identify a person and choose what is appropriate to share with a digital tool.',[
  'I can identify a direct identifier and a combination of details that could identify someone.',
  'I can explain which details are unnecessary for the practice task.',
  'I can replace the example with a fictional version and explain why removing a name alone may not be enough.',
 ],'Give students a wholly fictional case. Collect their annotated identifiers and rewritten fictional prompt; do not use real student records.',['technology-safety']),
 'check-claims':l('We are learning to verify factual claims by checking evidence in reliable sources.',[
  'I can identify three specific claims that can be checked.',
  'I can classify each claim as supported, contradicted or uncertain and record the source evidence.',
  'I can correct or qualify the response in my own words without inventing evidence.',
 ],'Collect a three-row claim–source–judgement table and a corrected short response. Open and check the sources.',['english-critical']),
 culture:l('We are learning to examine whose perspectives are represented or missing in a digital text.',[
  'I can identify a perspective or assumption in the text and point to evidence for it.',
  'I can explain a relevant perspective or piece of local knowledge that is missing.',
  'I can identify an appropriate source or person to consult and explain why their context or authority matters.',
 ],'Collect an annotated passage and a short explanation of a missing perspective and the source needed to check it.',['english-perspectives']),
 canary:l('We are learning to explain how an embedded instruction can influence an AI summary and recognise the limits of that evidence.',[
  'I can distinguish source facts, a distinctive marker and an instruction to include that marker.',
  'I can compare a clean and an altered example and describe what happened in each run.',
  'I can explain why the marker appearing or not appearing does not prove whether a student used AI.',
 ],'Students annotate the fictional source and complete two sentences: “This run shows…” and “This result cannot establish…”. A printed pair of responses can be used.',['technology-ai','english-critical']),
 trojan:l('We are learning to distinguish the user’s legitimate task from instructions embedded inside source material.',[
  'I can identify the original task and the extra direction inside the fictional source.',
  'I can describe how following the extra direction would change the intended answer.',
  'I can explain which instruction has authority and propose a check before using the result.',
 ],'Collect an annotated task/source pair and the student’s explanation of the attempted redirection.',['technology-ai','english-critical']),
 'hidden-text':l('We are learning to explain how a document’s formatting can change what people and software can read.',[
  'I can compare the visible document with its selected or copied text and record a difference.',
  'I can identify text that attempts to instruct an AI rather than inform a reader.',
  'I can explain why copying or exporting may expose or remove text and why the result is not proof of authorship.',
 ],'Collect a before/after comparison from a labelled fictional document, plus an explanation of what changed and what remains uncertain.',['technology-ai','english-digital']),
 'rubric-injection':l('We are learning to evaluate feedback against stated criteria and identify attempts to influence a judgement.',[
  'I can identify the relevant criterion and the evidence in a fictional response.',
  'I can identify a direction inside the response that tries to influence the marker.',
  'I can explain whether feedback uses the criterion or the inserted direction, quoting evidence for my judgement.',
 ],'Collect a criterion–response–feedback comparison and a reasoned judgement. Use fictional practice work and teacher-checked criteria.',[],senior),
 'image-injection':l('We are learning to identify how words inside an image can attempt to influence a digital interpretation.',[
  'I can describe what the image shows separately from what its text asks an AI to do.',
  'I can identify the inserted instruction and explain the judgement it tries to influence.',
  'I can compare a description with the image evidence and identify an unsupported judgement.',
 ],'Collect an annotated fictional poster and a short comparison of observed features, inserted direction and the resulting description.',['english-digital','technology-ai']),
 'spreadsheet-injection':l('We are learning to validate a data summary using the original values and independent calculations.',[
  'I can calculate the required counts from the fictional table and show my method.',
  'I can compare a summary with those counts and identify a discrepancy or confirm agreement.',
  'I can explain why an instruction in a text cell must not be treated as a data result.',
 ],'Collect the table calculations, a checked summary and one explanation distinguishing a data value from an attempted instruction.',['maths-data','technology-ai']),
 'authority-spoof':l('We are learning to evaluate claims of authority by checking authorship, purpose and the original source.',[
  'I can identify a statement that claims to change the task rules.',
  'I can check that claim against the teacher-provided original instructions and identify a mismatch or uncertainty.',
  'I can justify which instructions to follow and state what needs confirmation before acting.',
 ],'Collect an annotated fictional notice and a decision supported by the original task instructions.',['english-critical','technology-ai']),
 'poisoned-retrieval':l('We are learning to trace conclusions to their sources and identify attempts to influence a source-based comparison.',[
  'I can match a conclusion to a specific page and supporting passage.',
  'I can identify a direction in a source that tries to favour one conclusion.',
  'I can judge whether the comparison is supported by the source evidence and explain an uncertainty.',
 ],'Collect a conclusion–page–passage table and a short evaluation of the comparison using a wholly fictional source pack.',[],senior),
 'translation-injection':l('We are learning to distinguish translating an instruction as text from carrying out that instruction.',[
  'I can use a teacher-checked version to explain the meaning of the sample passage.',
  'I can identify words directed at the translator or AI and explain their intended effect.',
  'I can explain whether a response translated those words or followed them, using evidence from both texts.',
 ],'Collect a marked bilingual sample and a short explanation. Use only a language and translation the teacher can verify.',['technology-ai','english-critical']),
 'context-bleed':l('We are learning to identify assumptions carried from one digital task into another and check whether they still apply.',[
  'I can state the relevant context for each of two fictional tasks.',
  'I can identify an assumption in the response and explain whether the second task supports it.',
  'I can revise the context instructions, compare the next response and explain a remaining limit.',
 ],'Collect a two-task comparison with the inherited assumption highlighted and a short evaluation of the revised response.',['technology-ai']),
 'english-evidence':l('We are learning to justify an interpretation by explaining how specific text evidence supports an idea.',[
  'I can state a clear interpretation relevant to the class text.',
  'I can choose and accurately quote a passage that supports my interpretation.',
  'I can improve my explanation in my own words and explain the link between the quotation and my idea.',
 ],'Collect the initial paragraph, an accurate quotation checked against the text, and an independently revised explanation.',['english-critical','english-writing']),
 'maths-error':l('We are learning to identify the first invalid step in a worked solution and justify a valid method.',[
  'I can locate the first step that does not follow the relevant mathematical rule.',
  'I can explain the error and correct that step using the rule taught in class.',
  'I can solve a similar fresh problem independently and show the valid method.',
 ],'Provide a teacher-checked example for the specific concept being taught. Collect the annotated error and an independent solution to a fresh problem.',['maths-reasoning'],'Specify the mathematical concept, year-level content and rule before using this lesson activity. The connection is to reasoning within that content; using AI does not teach or cover the content by itself.'),
 'science-claims':l('We are learning to distinguish an observation from an explanation and use evidence to evaluate a scientific claim.',[
  'I can describe a pattern using the actual measurements, including units where relevant.',
  'I can distinguish what was observed from what is a possible explanation.',
  'I can propose a further measurement that would help test an explanation and justify that choice.',
 ],'Collect a table separating observations and explanations, then a proposed test linked to the science concept taught.',['science-enquiry'],'Choose the relevant science knowledge and a teacher-checked dataset. The linked example is Year 9 life processes; find the appropriate sequence before claiming a connection in another science topic.'),
 'history-sources':l('We are learning to compare source perspectives and explain how author, purpose and context affect interpretation.',[
  'I can identify the author, context and purpose of each supplied source.',
  'I can compare perspectives using specific words or details from both sources.',
  'I can explain a limitation or missing perspective and identify the evidence needed to investigate it.',
 ],'Collect a two-source comparison and one justified limitation. Use checked extracts from a specified historical or social-sciences context. The Year 9 history example is a foundation connection; choose the appropriate year’s content for older students.',['social-enquiry','english-perspectives']),
 'technology-design':l('We are learning to evaluate design options against a brief and justify a decision using evidence.',[
  'I can compare two options against the user needs and criteria supplied in the brief.',
  'I can use my own sketch, model, measurement or test to support the comparison.',
  'I can justify a choice by explaining an advantage, a trade-off and a next improvement.',
 ],'Collect the compared designs, a piece of student-produced modelling or test evidence, and a short justified decision.',['technology-design']),
 'food-evaluate':l('We are learning to explain how an ingredient or process change could affect a food product and test that prediction.',[
  'I can predict an effect on a food property and explain it using the ingredient or process function taught.',
  'I can plan a fair comparison with one stated change and relevant conditions kept consistent.',
  'I can use observations from a teacher-approved trial to judge the change and justify a next step.',
 ],'Collect the prediction, comparison plan and actual observations from an approved trial. If no trial is done, assess the plan rather than claiming a tested outcome.',['technology-food']),
 'arts-critique':l('We are learning to explain how creative choices influence an audience and revise a work for a stated purpose.',[
  'I can identify my creative intention and a feature chosen to communicate it.',
  'I can compare two possible audience interpretations with reference to specific features of the work.',
  'I can make or propose a deliberate revision and justify how it supports my intention.',
 ],'Collect an initial work or performance record, a short audience-response comparison, and the student’s justified revision.',['arts-response'],'Select the art discipline and the knowledge, techniques and conventions being taught. The suggested connection is an example through Visual Arts; adapt and verify the equivalent in another arts discipline.'),
 'languages-dialogue':l('We are learning to use familiar vocabulary and sentence structures to communicate for a specific purpose.',[
  'I can use the teacher’s target vocabulary and sentence structure to make my meaning clear.',
  'I can respond relevantly in a short exchange about the agreed situation.',
  'I can use the same language in a fresh short exchange without AI and explain one correction.',
 ],'Name the target vocabulary, structure and communicative purpose before starting. Observe an independent follow-up exchange using those targets.',['languages-communication'],'Select a language, learner stage and current language-specific sequence. The linked example is French Novice 3. Other languages and learner stages need their own current sequence; the connection does not verify translations or establish proficiency.'),
 'pe-coach':l('We are learning to evaluate general training suggestions using a taught movement or physical-activity principle.',[
  'I can accurately explain the principle taught in the lesson.',
  'I can evaluate two suggestions against that principle and the needs of the fictional scenario.',
  'I can justify a change or identify information a PE teacher would need before recommending an activity.',
 ],'Collect a principle–suggestion–judgement table and a justified adaptation. Use a fictional scenario and teacher-approved class principles.',['health-movement'],'Specify the movement or physical-activity knowledge being taught. This is critical evaluation of general suggestions, not individual medical, diet or rehabilitation advice.'),
};
