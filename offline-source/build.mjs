import {build} from 'esbuild';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const result=await build({entryPoints:[fileURLToPath(new URL('./entry.tsx',import.meta.url))],bundle:true,write:false,minify:true,format:'iife',jsx:'automatic',target:['es2020'],define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof'});
const js=result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script');
const css=(await readFile(new URL('./styles.css',import.meta.url),'utf8')).replace(/<\/style/gi,'<\\/style');
const html='<!doctype html><html lang="en-NZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Offline AI teaching guidance with lesson LI, SC and suggested curriculum connections."><title>AI in Practice — Offline edition</title><style>'+css+'</style></head><body><div id="root"></div><noscript>This toolkit needs JavaScript enabled. The complete editable source is included in this download.</noscript><script>'+js+'</script></body></html>';
await writeFile(new URL('../index.html',import.meta.url),html);console.log('Built offline edition ('+new TextEncoder().encode(html).length+' bytes).');
