# Build Week Launch Receipt

Status: public sample-ready deployment verified. Live GPT-5.6 activation awaits one masked Sites credential entry.

## Product Boundary

- New isolated Sites app; no production WordPress code changed.
- No account, uploads, payments, mail, Team Ops, private Auntie AI records, or Black2Africa database access.
- Three synthetic sample cases plus a quota-controlled live GPT-5.6 route.

## Deployment Evidence

- Public repository: `https://github.com/thefayth/blackwards-route-desk`
- Source commit deployed: `72eb9d16b669ad399a2a67f00ac6ba2020f5020e`
- Sites project: `appgprj_6a5ee785d7f481919c491f05f56daa5a`
- Sites version: `1` (`appgprj_6a5ee785d7f481919c491f05f56daa5a~appgver_6608c5d0577c819187a9d824ff9a3cdb`)
- Deployment: `appgdep_6a5eea7701a88191a4888e52d556aa12`, status `succeeded`
- Public URL: `https://blackwards-route-desk.indigo-iris-5804.chatgpt.site`
- Sites archive: `sha256:ec6c28883f29310c7ba40f16df4348715066228aed2d282defccb0f7f356604f`, 31 files, 4,085,760 bytes
- Local package: `work/blackwards-route-desk-v1.tar.gz`, SHA-256 `125127CD09500872D9D0767BE48D9A66A0FF3A3D7E713163484E07A52530F773`, 2,712,101 bytes
- D1 binding: `DB`; migration: `drizzle/0000_sticky_argent.sql`
- Runtime environment names: `OPENAI_MODEL`, `RATE_LIMIT_SALT`, `OPENAI_API_KEY`. Values are excluded from source and receipts.

## Verification Evidence

- `npm run lint`: pass
- `npx tsc --noEmit`: pass
- `npm test`: 5 unit and 3 rendered-runtime tests pass
- `npm run test:browser`: 9 tests pass across 390x844, 768x1024, and 1440x1000
- Public app and `/api/health`: HTTP `200`
- Health response: metadata-only retention, model `gpt-5.6`, `liveReady: false`
- Live sample, export, privacy rejection, keyboard-reachable controls, and horizontal overflow are covered by Playwright
- Production dependency audit: no high or critical advisory; two moderate advisories remain in Next's nested PostCSS dependency pending an upstream-safe update
- Social card: `public/og.png`, SHA-256 `D29DFE9345C099447805E85815DF8140E791E2ECD6D052D9CAD609184BFAB42B`
- Production screenshots:
  - desktop: SHA-256 `5A36240B0DC8D4C388A11FC37A9B9EBC18E45CAEAD87877D556D55297D1F7FF7`
  - tablet: SHA-256 `FBCA0AAE9F913FD278FDFBA43B1803054C80D6397B0F1F1754F6D8F30AF85CBF`
  - phone: SHA-256 `2C5986B4EF18A64504145C81A88EC0F50BB07A813F3F8186F902E7B3CB3491B2`

## Presentation Evidence

- Candidate A, Signal Ledger: editable Canva design `DAHP_GoRa-A`; selected direction
- Candidate B, Route Map: editable Canva design `DAHP_B5PZkI`; preserved alternate
- Final six-slide pitch: editable Canva design `DAHP_DkOGdo`
- Final edit URL: `https://www.canva.com/d/60fpTBXLJ_Y3Vbs`
- Final view URL: `https://www.canva.com/d/BMzV-4CeUqTEzKD`
- Candidate A source SHA-256: `263F8B7DFA9D3275BC65344ADCB668DEA3F6D98C9CA37D74C7D51B17E72A9A2B`
- Candidate B source SHA-256: `0A909C2A1AE80B9B055C0513FE3ED819E8C18DC6DFAACCCB40158BC1A3A41DA8`

## Demo Evidence

- Final demo: `work/demo/blackwards-route-desk-demo.mp4`
- Duration: `00:02:19.39`; frame size: `1280x720`
- Demo SHA-256: `718DC63F751CB357E7EFB25D42F79DD0369541F4B54013DC0CBDD9891C0804D3`
- Narration SHA-256: `BCC538E67EFA0D0847BAC991A284D4D02CE47CA7EF9D69987BD5BD6CC7DCC1D0`
- Caption VTT SHA-256: `A61326D6EA85AFBBAC91F811297A38BE18B63EBA9482071790F0557FBA99B457`
- Thumbnail SHA-256: `D29DFE9345C099447805E85815DF8140E791E2ECD6D052D9CAD609184BFAB42B`
- The synthetic narration is disclosed in the upload copy.

## Remaining Account-Bound Evidence

- One hashed production GPT-5.6 response after `OPENAI_API_KEY` is entered through the masked Sites environment control
- Public YouTube URL after account-owner OAuth or 2FA
- Devpost project URL, final submission timestamp, and primary Codex `/feedback` Session ID

## Rollback

Disable Sites public access, revoke the project-scoped OpenAI key, and archive the isolated GitHub repository. The existing `black2africa.xyz` deployment requires no rollback.
