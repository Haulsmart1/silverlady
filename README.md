# Silver Lady Holdings website

Static source recovered from Vercel production deployment `dpl_A5HhaR26RoKwe8BBKq4STc4k99Ph` on 16 November 2026. The existing GitHub repository was empty. All 21 public files matched the deployment source SHA-1 identifiers; the deployment's Vercel configuration was recovered separately. The unmodified snapshot is on `baseline/production-2026-11-16`.

## Local checks

- `npm ci`
- `npm test` — internal links, assets, metadata, JSON-LD, sitemap, portfolio structure and publishing-note checks.
- `npm run build` — copies the static site to `dist/`.
- `python -m http.server 4173 --directory src`
- `npx playwright install chromium` then `npm run test:browser` in another terminal. Set `CHROMIUM_PATH` to use an installed Chromium; `BASE_URL` can select another origin.

Browser checks cover four viewport widths, horizontal overflow, WCAG A/AA via axe, mobile menu/Escape, skip link, sector navigation, retained pages and JavaScript errors. Screenshots are written to ignored `work/`.

## Preview and release

Deploy the contents of `src/` with its existing `vercel.json` to project `silverlady`, team `haulsmart`. Preview only. No production deployment, promotion, Git integration change or merge is authorized by this repair.

## Content decisions

Wizard Labs is the SaaS and AI division of Silver Lady Holdings, without a separate incorporation claim. Product cards use neutral descriptions and categories, without development labels or new availability claims. Crypto Ninja links to group enquiries because no public product URL was verified. Cobweb Defence remains a research concept. The unverified Fast Freight Solutions entry is excluded.
