import {readFile,readdir,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const root=path.resolve('src');
async function walk(dir){const items=await readdir(dir,{withFileTypes:true});return (await Promise.all(items.map(x=>x.isDirectory()?walk(path.join(dir,x.name)):path.join(dir,x.name)))).flat();}
const files=await walk(root);let links=0;
for(const f of files.filter(f=>f.endsWith('.html'))){
 if(f.includes('googlee'))continue;
 const s=await readFile(f,'utf8');assert(!/STATUS TO CONFIRM|RELATIONSHIP TO CONFIRM|awaiting confirmation/i.test(s),f);
 assert.equal((s.match(/<h1[ >]/g)||[]).length,1,f);
 if(!f.includes('googlee')){assert(s.includes('name="viewport"'),f);assert(s.includes('name="description"'),f);}
 for(const [,url] of s.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(!url.startsWith('/'))continue;
  const [p,fragment]=url.split('#');let target=path.join(root,p);if(p.endsWith('/'))target=path.join(target,'index.html');assert((await stat(target)).isFile(),url);links++;
  if(fragment){const html=await readFile(target,'utf8');assert(html.includes(`id="${fragment}"`),url);}
 }
 for(const [,json] of s.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g))JSON.parse(json);
}
const group=await readFile('src/our-group/index.html','utf8');
for(const id of ['transport','freight','wizard-labs','research','development'])assert(group.includes(`id="${id}"`));
assert.equal((group.match(/class="portfolio-card"/g)||[]).length,8);
assert(!group.includes('Fast Freight Solutions'));
const sitemap=await readFile('src/sitemap.xml','utf8');assert(sitemap.includes('https://www.silverladyholdings.com/our-group/'));
console.log(`PASS: ${files.length} source files; ${links} internal page/asset links; metadata, JSON-LD, sections and development labels.`);
