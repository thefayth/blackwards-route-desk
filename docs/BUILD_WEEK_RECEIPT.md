# Build Week Launch Receipt

Status: public deployment and live GPT-5.6 route verified.

## Product Boundary

- New isolated Sites app; no production WordPress code changed.
- No account, uploads, payments, mail, Team Ops, private Auntie AI records, or Black2Africa database access.
- Three synthetic sample cases plus a quota-controlled live GPT-5.6 route.

## Deployment Evidence

- Public repository: `https://github.com/thefayth/blackwards-route-desk`
- Source commit deployed: `4764f4dc41f9400711d5208df5a292d3f7b1e390`
- Sites project: `appgprj_6a5ee785d7f481919c491f05f56daa5a`
- Sites version: `5` (`appgprj_6a5ee785d7f481919c491f05f56daa5a~appgver_52f75366c55c819195b156148279c1b6`)
- Deployment: `appgdep_6a5f40a5240c8191866227bf2f04b04c`, status `succeeded`
- Public URL: `https://blackwards-route-desk.indigo-iris-5804.chatgpt.site`
- Sites archive: `sha256:5339b1239e8fceabdf293ec3a712db974c19eba5ca30dc5ab6bc6f08eebb49db`, 31 files, 4,085,760 bytes
- Local package: `work/blackwards-route-desk-v5.tar.gz`, SHA-256 `A0CF7F586F96A1347448D3E345B0656508DE91D8F0385BD203AC03744536B7A6`, 2,712,435 bytes
- Previous rollback: Sites version `4` (`appgprj_6a5ee785d7f481919c491f05f56daa5a~appgver_5c03d98ff6bc81918a70435c8a1ffd66`), deployment `appgdep_6a5f4006ed38819184379cdedf5f154c`
- D1 binding: `DB`; migration: `drizzle/0000_sticky_argent.sql`
- Runtime environment revision: `2`; names: `OPENAI_MODEL`, `RATE_LIMIT_SALT`, `OPENAI_API_KEY`. Secret values are excluded from source and receipts.

## Verification Evidence

- `npm run lint`: pass
- `npx tsc --noEmit`: pass
- `npm test`: 5 unit and 3 rendered-runtime tests pass
- `npm run test:browser`: 9 tests pass across 390x844, 768x1024, and 1440x1000
- `npm run test:live`: the same 9 tests pass against the anonymous public deployment
- Public app and `/api/health`: HTTP `200`
- Health response: metadata-only retention, model `gpt-5.6`, `liveReady: true`
- Live GPT proof: HTTP `200`, `source: live`, `model: gpt-5.6`, verdict `clarify`, route ID `d4dc1ab1-904c-400b-b32e-d80997470899`
- Live response SHA-256: `4a04df971c57b53742797b685f741cf3d8d6069dfe816506cddce73ae403c826`; no prompt or response content was written to the receipt
- Live QA quota after proof: one actor attempt remained for the UTC day; the five-attempt allowance resets daily and samples remain unlimited
- Live sample, export, privacy rejection, keyboard-reachable controls, and horizontal overflow are covered by Playwright
- Production dependency audit: no high or critical advisory; two moderate advisories remain in Next's nested PostCSS dependency pending an upstream-safe update
- Social card: `public/og.png`, SHA-256 `D29DFE9345C099447805E85815DF8140E791E2ECD6D052D9CAD609184BFAB42B`
- Production screenshots:
  - desktop: SHA-256 `5A36240B0DC8D4C388A11FC37A9B9EBC18E45CAEAD87877D556D55297D1F7FF7`
  - tablet: SHA-256 `FBCA0AAE9F913FD278FDFBA43B1803054C80D6397B0F1F1754F6D8F30AF85CBF`
  - phone: SHA-256 `76633CAB8BFB5F1987A17972ACFFCF63CB9AF82690A6F5447245DB53C6840D88`

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

- Public YouTube URL after account-owner OAuth or 2FA
- Devpost project URL, final submission timestamp, and primary Codex `/feedback` Session ID

## Rollback

Disable Sites public access, revoke the project-scoped OpenAI key, and archive the isolated GitHub repository. The existing `black2africa.xyz` deployment requires no rollback.
