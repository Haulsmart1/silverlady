const {chromium}=require('playwright');
const {AxeBuilder}=require('@axe-core/playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});const context=await browser.newContext();const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,768,390,320]){
 await page.setViewportSize({width,height:1000});await page.goto((process.env.BASE_URL || 'http://localhost:4173')+'/our-group/');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
 if(width<850){const button=page.getByRole('button',{name:'Menu',exact:true});await button.click();assert.equal(await button.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await button.getAttribute('aria-expanded'),'false');}
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(result.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)})),[],`axe at ${width}`);
 await page.screenshot({path:`work/group-${width}.png`,fullPage:true});console.log(`PASS ${width}px: no overflow; axe WCAG A/AA clean; mobile menu/Escape verified`);
}
await page.goto((process.env.BASE_URL || 'http://localhost:4173')+'/our-group/');await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent(),'Skip to content');await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main');
await page.locator('.sector-nav a[href="#wizard-labs"]').click();assert.equal(new URL(page.url()).hash,'#wizard-labs');
for(const route of ['/','/about/','/logistics/','/technology/','/contact/','/heritage/','/privacy/']){const r=await page.goto((process.env.BASE_URL || 'http://localhost:4173')+''+route);assert.equal(r.status(),200);}
assert.deepEqual(errors,[]);console.log('PASS keyboard skip link, sector navigation, all retained routes and JavaScript errors');await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
