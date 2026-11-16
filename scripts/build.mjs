import {cp,rm,stat} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await cp('src','dist',{recursive:true});
for(const p of ['index.html','our-group/index.html','assets/portfolio.css','sitemap.xml','vercel.json'])await stat(`dist/${p}`);
console.log('PASS: static production build created in dist/');
