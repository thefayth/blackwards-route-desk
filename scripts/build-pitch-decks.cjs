/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("node:path");
const fs = require("node:fs");
const PptxGenJS = require("pptxgenjs");

const pptxPath = (...parts) => path.resolve(...parts);
const assets = {
  og: pptxPath("public/og.png"),
  composer: pptxPath("work/demo/frame-composer.png"),
  protect: pptxPath("work/demo/frame-protect.png"),
  action: pptxPath("work/demo/frame-action.png"),
  clarify: pptxPath("work/demo/frame-clarify.png"),
};

const C = {
  ink: "0C0C0A",
  paper: "F5F2E9",
  green: "006B45",
  red: "941D24",
  yellow: "E3B827",
  gray: "D7D2C5",
  white: "FFFFFF",
};

function addText(slide, text, x, y, w, h, options = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: options.fontFace || "Arial",
    fontSize: options.fontSize || 18,
    color: options.color || C.ink,
    bold: options.bold || false,
    breakLine: false,
    margin: options.margin ?? 0,
    valign: options.valign || "mid",
    align: options.align || "left",
    fit: "shrink",
    ...options,
  });
}

function addFooter(pptx, slide, number, dark = false) {
  const color = dark ? C.white : C.ink;
  slide.addShape(pptx.ShapeType.line, { x: 0.55, y: 7.08, w: 12.23, h: 0, line: { color, transparency: 65, width: 0.6 } });
  addText(slide, "AUNTIE AI · BLACKWARDS ROUTE DESK", 0.58, 7.12, 4.2, 0.18, { fontSize: 7.5, bold: true, color });
  addText(slide, String(number).padStart(2, "0"), 12.1, 7.12, 0.62, 0.18, { fontSize: 7.5, bold: true, color, align: "right" });
}

function addGrid(pptx, slide, color = C.gray) {
  for (let x = 0; x <= 13.4; x += 0.65) {
    slide.addShape(pptx.ShapeType.line, { x, y: 0, w: 0, h: 7.5, line: { color, transparency: 76, width: 0.35 } });
  }
  for (let y = 0; y <= 7.5; y += 0.65) {
    slide.addShape(pptx.ShapeType.line, { x: 0, y, w: 13.33, h: 0, line: { color, transparency: 76, width: 0.35 } });
  }
}

function addKicker(slide, text, x, y, w, color = C.green) {
  addText(slide, text.toUpperCase(), x, y, w, 0.28, { fontSize: 9, bold: true, color, charSpacing: 1.2 });
}

function addFrame(pptx, slide, image, x, y, w, h, border = C.ink) {
  const altText = {
    [assets.og]: "Auntie AI Blackwards Route Desk launch artwork",
    [assets.composer]: "Blackwards Route Desk composer with public-safe synthetic offer terms",
    [assets.protect]: "Protect route packet generated from a synthetic exhibition case",
    [assets.action]: "Route packet ownership checks and 24-hour next action",
    [assets.clarify]: "Clarify route packet generated from a synthetic accelerator case",
  }[image] || "Blackwards Route Desk product screen";
  slide.addShape(pptx.ShapeType.rect, { x: x - 0.05, y: y - 0.05, w: w + 0.1, h: h + 0.1, fill: { color: border }, line: { color: border } });
  slide.addImage({ path: image, x, y, w, h, altText });
}

function addSignal(slide, x, y, number, title, body, color) {
  slide.addShape("rect", { x, y, w: 0.54, h: 0.54, fill: { color }, line: { color } });
  addText(slide, number, x, y, 0.54, 0.54, { fontSize: 9, bold: true, color: C.white, align: "center" });
  addText(slide, title, x + 0.72, y - 0.02, 2.15, 0.25, { fontSize: 12, bold: true });
  addText(slide, body, x + 0.72, y + 0.23, 2.28, 0.44, { fontSize: 8.5, color: "40403B", valign: "top" });
}

function baseDeck(title) {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Faith Cheltenham with Codex";
  pptx.company = "Black2Africa";
  pptx.subject = "OpenAI Build Week 2026 · Work and Productivity";
  pptx.title = title;
  pptx.lang = "en-US";
  pptx.theme = {
    headFontFace: "Arial",
    bodyFontFace: "Arial",
    lang: "en-US",
  };
  return pptx;
}

function buildLedgerDeck() {
  const pptx = baseDeck("Auntie AI: Blackwards Route Desk · Signal Ledger");

  {
    const s = pptx.addSlide();
    s.background = { color: C.ink };
    addKicker(s, "Work & Productivity · OpenAI Build Week 2026", 0.7, 0.55, 5.5, C.yellow);
    addText(s, "READ THE ROUTE\nBEFORE YOUR\nWORK MOVES.", 0.7, 1.15, 5.6, 3.15, { fontSize: 35, bold: true, color: C.white, valign: "top", breakLine: true });
    addText(s, "GPT-5.6 turns visible offer terms into an owner-first route packet.", 0.72, 4.55, 4.95, 0.9, { fontSize: 16, color: C.white, valign: "top" });
    s.addShape(pptx.ShapeType.rect, { x: 0.72, y: 5.72, w: 2.36, h: 0.46, fill: { color: C.green }, line: { color: C.green } });
    addText(s, "OWNERSHIP BEFORE MOVEMENT", 0.84, 5.72, 2.12, 0.46, { fontSize: 8.2, bold: true, color: C.white, align: "center" });
    addFrame(pptx, s, assets.og, 6.42, 0.82, 6.25, 3.28, C.white);
    s.addShape(pptx.ShapeType.rect, { x: 6.42, y: 4.42, w: 6.25, h: 1.34, fill: { color: C.red }, line: { color: C.red } });
    addText(s, "Auntie AI: Blackwards Route Desk", 6.75, 4.63, 5.55, 0.42, { fontSize: 20, bold: true, color: C.white });
    addText(s, "Opportunity · Partnership · Funding · Publishing", 6.75, 5.12, 5.55, 0.28, { fontSize: 10, color: C.white });
    addFooter(pptx, s, 1, true);
  }

  {
    const s = pptx.addSlide();
    s.background = { color: C.paper };
    addGrid(pptx, s);
    addKicker(s, "The problem", 0.68, 0.5, 2.2, C.red);
    addText(s, "Speed hides the terms\ndoing the most work.", 0.68, 0.88, 7.15, 1.45, { fontSize: 31, bold: true, valign: "top" });
    addText(s, "Black creators are asked to move before the exchange is legible.", 8.5, 1.05, 3.9, 0.72, { fontSize: 15, valign: "top" });
    const cards = [
      ["01", "COMPENSATION", "A visible fee, revenue split, expenses, and payment date."],
      ["02", "RIGHTS", "License scope, territory, channels, term, exclusivity, and transfer."],
      ["03", "CREDIT", "Where the creator is named, how attribution travels, and who approves edits."],
      ["04", "AUDIENCE ACCESS", "What data, exports, contacts, or channels a partner can touch."],
    ];
    cards.forEach(([n, t, b], i) => {
      const x = 0.68 + i * 3.08;
      const color = i === 1 || i === 3 ? C.red : C.green;
      s.addShape(pptx.ShapeType.rect, { x, y: 3.0, w: 2.75, h: 2.85, fill: { color: C.white }, line: { color: C.ink, width: 1 } });
      s.addShape(pptx.ShapeType.rect, { x, y: 3.0, w: 2.75, h: 0.14, fill: { color }, line: { color } });
      addText(s, n, x + 0.2, 3.32, 0.48, 0.28, { fontSize: 10, bold: true, color });
      addText(s, t, x + 0.2, 3.78, 2.3, 0.54, { fontSize: 14, bold: true, valign: "top" });
      addText(s, b, x + 0.2, 4.55, 2.28, 0.96, { fontSize: 10, valign: "top", color: "383834" });
    });
    addFooter(pptx, s, 2);
  }

  {
    const s = pptx.addSlide();
    s.background = { color: C.paper };
    addKicker(s, "The working route", 0.68, 0.5, 3.2);
    addText(s, "A complete packet in under 90 seconds.", 0.68, 0.88, 7.4, 0.72, { fontSize: 27, bold: true });
    addFrame(pptx, s, assets.composer, 0.68, 1.9, 7.6, 4.28, C.ink);
    addSignal(s, 8.75, 1.95, "01", "CHOOSE", "Opportunity, partnership, funding, or publishing.", C.red);
    addSignal(s, 8.75, 2.9, "02", "SUMMARIZE", "Public-safe visible offer terms. No account or upload.", C.green);
    addSignal(s, 8.75, 3.85, "03", "MARK", "Compensation, rights, credit, audience access, urgency.", C.yellow);
    addSignal(s, 8.75, 4.8, "04", "ROUTE", "Proceed, Clarify, Protect, or Pass with one 24-hour action.", C.red);
    addText(s, "COPY · DOWNLOAD · KEEP THE RECEIPT", 8.78, 6.08, 3.65, 0.28, { fontSize: 9, bold: true, color: C.green });
    addFooter(pptx, s, 3);
  }

  {
    const s = pptx.addSlide();
    s.background = { color: C.ink };
    addKicker(s, "Creator case · synthetic", 0.68, 0.48, 3.5, C.yellow);
    addText(s, "PERMANENT RIGHTS.\nNO CLEAR FEE.\nAUDIENCE EXPORT.", 0.68, 0.93, 4.72, 1.8, { fontSize: 25, bold: true, color: C.white, valign: "top" });
    s.addShape(pptx.ShapeType.rect, { x: 0.68, y: 3.08, w: 3.95, h: 1.0, fill: { color: C.red }, line: { color: C.red } });
    addText(s, "PROTECT", 0.9, 3.2, 1.5, 0.28, { fontSize: 13, bold: true, color: C.white });
    addText(s, "Pause movement until ownership and benefit are rewritten.", 0.9, 3.52, 3.25, 0.34, { fontSize: 10, color: C.white });
    addText(s, "24-HOUR MOVE", 0.72, 4.62, 1.4, 0.25, { fontSize: 8.5, bold: true, color: C.yellow });
    addText(s, "Reply with a narrow nonexclusive license proposal and a named fee before sending files.", 0.72, 4.98, 4.3, 1.0, { fontSize: 15, bold: true, color: C.white, valign: "top" });
    addFrame(pptx, s, assets.protect, 5.6, 0.9, 7.05, 3.96, C.white);
    addFrame(pptx, s, assets.action, 5.6, 5.12, 7.05, 1.32, C.yellow);
    addFooter(pptx, s, 4, true);
  }

  {
    const s = pptx.addSlide();
    s.background = { color: C.paper };
    addGrid(pptx, s);
    addKicker(s, "Architecture and privacy", 0.68, 0.5, 3.4);
    addText(s, "The creator's text does not become the ledger.", 0.68, 0.9, 8.1, 0.72, { fontSize: 27, bold: true });
    const steps = [
      ["VALIDATE", "Reject private data and prompt-shaped instructions."],
      ["D1 QUOTA", "5 per actor · 100 global · metadata hashes only."],
      ["GPT-5.6", "Responses API · medium reasoning · no tools · store:false."],
      ["SCHEMA", "Strict route packet validation before display."],
      ["EXPORT", "Copy or download. Nothing is sent to Black2Africa."],
    ];
    steps.forEach(([title, body], i) => {
      const x = 0.68 + i * 2.5;
      const color = i === 2 ? C.red : (i % 2 ? C.yellow : C.green);
      s.addShape(pptx.ShapeType.rect, { x, y: 2.35, w: 2.1, h: 2.05, fill: { color: C.white }, line: { color: C.ink, width: 1 } });
      s.addShape(pptx.ShapeType.rect, { x, y: 2.35, w: 2.1, h: 0.17, fill: { color }, line: { color } });
      addText(s, String(i + 1).padStart(2, "0"), x + 0.16, 2.72, 0.4, 0.24, { fontSize: 8, bold: true, color });
      addText(s, title, x + 0.16, 3.08, 1.78, 0.35, { fontSize: 12, bold: true });
      addText(s, body, x + 0.16, 3.52, 1.76, 0.7, { fontSize: 8.2, valign: "top" });
      if (i < 4) addText(s, "→", x + 2.15, 3.08, 0.3, 0.35, { fontSize: 18, bold: true, color: C.green, align: "center" });
    });
    s.addShape(pptx.ShapeType.rect, { x: 0.68, y: 5.15, w: 12.05, h: 0.92, fill: { color: C.ink }, line: { color: C.ink } });
    addText(s, "D1 STORES", 0.95, 5.35, 1.25, 0.28, { fontSize: 9, bold: true, color: C.yellow });
    addText(s, "salted actor hash · input hash · model status · latency · timestamp · counters", 2.15, 5.3, 6.5, 0.38, { fontSize: 11, color: C.white });
    addText(s, "NEVER STORES", 9.02, 5.35, 1.4, 0.28, { fontSize: 9, bold: true, color: C.red });
    addText(s, "summary · packet", 10.38, 5.3, 1.9, 0.38, { fontSize: 11, bold: true, color: C.white });
    addFooter(pptx, s, 5);
  }

  {
    const s = pptx.addSlide();
    s.background = { color: C.yellow };
    addKicker(s, "Build Week contribution", 0.68, 0.52, 3.5, C.red);
    addText(s, "OWNERSHIP\nBEFORE\nMOVEMENT.", 0.68, 1.0, 5.25, 2.45, { fontSize: 38, bold: true, valign: "top" });
    s.addShape(pptx.ShapeType.rect, { x: 6.12, y: 0, w: 7.21, h: 7.5, fill: { color: C.ink }, line: { color: C.ink } });
    addText(s, "FAITH CHELTENHAM", 6.72, 0.9, 2.5, 0.28, { fontSize: 9, bold: true, color: C.green });
    addText(s, "Product direction and the Blackwards frame: read backward from ownership, attribution, and leverage.", 6.72, 1.33, 5.55, 1.0, { fontSize: 17, bold: true, color: C.white, valign: "top" });
    addText(s, "CODEX", 6.72, 2.82, 1.1, 0.28, { fontSize: 9, bold: true, color: C.yellow });
    addText(s, "Isolated, implemented, tested, deployed, documented, recorded, and packaged the contest app.", 6.72, 3.22, 5.55, 0.95, { fontSize: 17, bold: true, color: C.white, valign: "top" });
    addText(s, "GPT-5.6", 6.72, 4.62, 1.2, 0.28, { fontSize: 9, bold: true, color: C.red });
    addText(s, "Performs the structured route reading through the Responses API.", 6.72, 5.02, 5.1, 0.55, { fontSize: 15, color: C.white, valign: "top" });
    addText(s, "blackwards-route-desk.indigo-iris-5804.chatgpt.site", 0.72, 5.25, 4.75, 0.76, { fontSize: 15, bold: true, valign: "top" });
    addText(s, "Auntie AI · Black2Africa", 0.72, 6.2, 3.2, 0.32, { fontSize: 10, bold: true, color: C.red });
    addFooter(pptx, s, 6);
  }

  return pptx;
}

function buildRouteMapDeck() {
  const pptx = baseDeck("Auntie AI: Blackwards Route Desk · Route Map");
  const heading = (s, n, kicker, title) => {
    addText(s, n, 0.65, 0.42, 0.5, 0.28, { fontSize: 9, bold: true, color: C.red });
    addKicker(s, kicker, 1.3, 0.42, 4.1);
    addText(s, title, 0.65, 0.95, 11.7, 0.78, { fontSize: 29, bold: true });
  };

  {
    const s = pptx.addSlide();
    s.background = { color: C.paper };
    addGrid(pptx, s);
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.22, h: 7.5, fill: { color: C.green }, line: { color: C.green } });
    addKicker(s, "Auntie AI · Work & Productivity", 0.78, 0.58, 4.5);
    addText(s, "BLACKWARDS\nROUTE DESK", 0.78, 1.18, 6.25, 1.7, { fontSize: 39, bold: true, valign: "top" });
    addText(s, "Read the route before your work moves.", 0.8, 3.18, 5.85, 0.7, { fontSize: 20, bold: true });
    addText(s, "GPT-5.6 converts public-safe offer terms into an owner-first route packet.", 0.8, 4.0, 5.35, 0.82, { fontSize: 14, valign: "top" });
    addFrame(pptx, s, assets.og, 6.85, 1.0, 5.8, 3.05, C.ink);
    ["OPPORTUNITY", "PARTNERSHIP", "FUNDING", "PUBLISHING"].forEach((t, i) => {
      const x = 6.85 + (i % 2) * 2.98;
      const y = 4.45 + Math.floor(i / 2) * 0.75;
      s.addShape(pptx.ShapeType.rect, { x, y, w: 2.82, h: 0.55, fill: { color: i === 0 ? C.ink : C.white }, line: { color: C.ink } });
      addText(s, t, x, y, 2.82, 0.55, { fontSize: 8.5, bold: true, color: i === 0 ? C.white : C.ink, align: "center" });
    });
    addFooter(pptx, s, 1);
  }

  {
    const s = pptx.addSlide(); s.background = { color: C.paper }; addGrid(pptx, s);
    heading(s, "02", "The decision surface", "The visible exchange, made legible.");
    const rows = [
      ["COMPENSATION", "fee · share · expenses · payment date", C.green],
      ["RIGHTS", "license · exclusivity · territory · transfer", C.red],
      ["CREDIT", "name · placement · edit approval · attribution", C.yellow],
      ["AUDIENCE ACCESS", "contacts · exports · channels · data", C.green],
    ];
    rows.forEach(([t, b, color], i) => {
      const y = 2.1 + i * 1.0;
      addText(s, String(i + 1).padStart(2, "0"), 0.75, y, 0.5, 0.55, { fontSize: 9, bold: true, color });
      s.addShape(pptx.ShapeType.line, { x: 1.35, y: y + 0.27, w: 2.2, h: 0, line: { color, width: 2 } });
      addText(s, t, 3.85, y, 2.25, 0.55, { fontSize: 14, bold: true });
      addText(s, b, 6.4, y, 5.4, 0.55, { fontSize: 13 });
    });
    s.addShape(pptx.ShapeType.rect, { x: 0.72, y: 6.24, w: 11.9, h: 0.52, fill: { color: C.ink }, line: { color: C.ink } });
    addText(s, "THE RISK IS NOT THAT THE CREATOR CANNOT READ. THE RISK IS THAT SPEED MAKES THE TERMS HARD TO SEE.", 0.95, 6.24, 11.45, 0.52, { fontSize: 9, bold: true, color: C.white, align: "center" });
    addFooter(pptx, s, 2);
  }

  {
    const s = pptx.addSlide(); s.background = { color: C.ink };
    addKicker(s, "One complete route", 0.68, 0.52, 3.3, C.yellow);
    addText(s, "FROM VISIBLE TERMS\nTO AN OWNED PACKET", 0.68, 1.02, 5.1, 1.35, { fontSize: 28, bold: true, color: C.white, valign: "top" });
    addFrame(pptx, s, assets.composer, 5.52, 0.72, 7.1, 4.0, C.white);
    const verbs = ["Choose", "Summarize", "Mark", "Route", "Export"];
    verbs.forEach((verb, i) => {
      const y = 2.85 + i * 0.62;
      addText(s, String(i + 1).padStart(2, "0"), 0.75, y, 0.48, 0.34, { fontSize: 9, bold: true, color: i === 3 ? C.red : C.green });
      addText(s, verb, 1.45, y, 2.1, 0.34, { fontSize: 15, bold: true, color: C.white });
    });
    addText(s, "No login. No upload. No route content retained.", 5.58, 5.12, 6.8, 0.42, { fontSize: 13, bold: true, color: C.yellow });
    addText(s, "A judge can reach a complete synthetic packet without spending a model run.", 5.58, 5.72, 6.7, 0.55, { fontSize: 13, color: C.white });
    addFooter(pptx, s, 3, true);
  }

  {
    const s = pptx.addSlide(); s.background = { color: C.paper }; addGrid(pptx, s);
    heading(s, "04", "Creator case · synthetic", "The route says Protect.");
    addFrame(pptx, s, assets.protect, 0.7, 1.95, 7.2, 4.05, C.ink);
    s.addShape(pptx.ShapeType.rect, { x: 8.35, y: 1.96, w: 4.28, h: 1.05, fill: { color: C.red }, line: { color: C.red } });
    addText(s, "PROTECT", 8.68, 2.1, 1.45, 0.3, { fontSize: 12, bold: true, color: C.white });
    addText(s, "Pause movement until ownership and benefit are rewritten.", 8.68, 2.42, 3.52, 0.35, { fontSize: 9.5, color: C.white });
    addKicker(s, "24-hour move", 8.4, 3.52, 2.2, C.red);
    addText(s, "Reply with a narrow nonexclusive license proposal and a named fee before sending files.", 8.4, 3.92, 3.75, 1.25, { fontSize: 17, bold: true, valign: "top" });
    addText(s, "WHAT STAYS YOURS", 8.4, 5.55, 1.8, 0.25, { fontSize: 8, bold: true, color: C.green });
    addText(s, "Copyright · scope · named credit · creator approval", 8.4, 5.9, 3.85, 0.45, { fontSize: 11 });
    addFooter(pptx, s, 4);
  }

  {
    const s = pptx.addSlide(); s.background = { color: C.paper };
    heading(s, "05", "System route", "Private text exits. Metadata remains.");
    const nodes = [
      ["GUARD", "private data blocked", C.green],
      ["QUOTA", "D1 hashes + counters", C.yellow],
      ["GPT-5.6", "strict output · store:false", C.red],
      ["PACKET", "server schema check", C.green],
      ["EXPORT", "creator-owned Markdown", C.ink],
    ];
    nodes.forEach(([t, b, color], i) => {
      const x = 0.66 + i * 2.52;
      s.addShape(pptx.ShapeType.ellipse, { x, y: 2.25, w: 1.28, h: 1.28, fill: { color }, line: { color } });
      addText(s, String(i + 1).padStart(2, "0"), x, 2.25, 1.28, 1.28, { fontSize: 13, bold: true, color: C.white, align: "center" });
      addText(s, t, x - 0.22, 3.82, 1.72, 0.32, { fontSize: 12, bold: true, align: "center" });
      addText(s, b, x - 0.34, 4.22, 1.96, 0.58, { fontSize: 8.7, align: "center", valign: "top" });
      if (i < 4) s.addShape(pptx.ShapeType.line, { x: x + 1.3, y: 2.9, w: 1.2, h: 0, line: { color: C.ink, width: 1.4, endArrowType: "triangle" } });
    });
    s.addShape(pptx.ShapeType.rect, { x: 1.02, y: 5.45, w: 11.25, h: 0.75, fill: { color: C.ink }, line: { color: C.ink } });
    addText(s, "D1 NEVER STORES THE CREATOR'S SUMMARY OR ROUTE PACKET", 1.02, 5.45, 11.25, 0.75, { fontSize: 14, bold: true, color: C.white, align: "center" });
    addFooter(pptx, s, 5);
  }

  {
    const s = pptx.addSlide(); s.background = { color: C.paper }; addGrid(pptx, s);
    heading(s, "06", "Build Week contribution", "One small desk. One larger operating rule.");
    const columns = [
      ["FAITH", "Product direction and Blackwards framing: read backward from ownership, attribution, and leverage.", C.red],
      ["CODEX", "Isolated, implemented, tested, deployed, documented, recorded, and packaged the contest app.", C.green],
      ["GPT-5.6", "Structured route reading through the Responses API with strict output and no retention.", C.yellow],
    ];
    columns.forEach(([t, b, color], i) => {
      const x = 0.7 + i * 4.18;
      s.addShape(pptx.ShapeType.rect, { x, y: 2.18, w: 3.72, h: 2.25, fill: { color: C.white }, line: { color: C.ink } });
      s.addShape(pptx.ShapeType.rect, { x, y: 2.18, w: 3.72, h: 0.16, fill: { color }, line: { color } });
      addText(s, t, x + 0.25, 2.67, 3.15, 0.4, { fontSize: 17, bold: true });
      addText(s, b, x + 0.25, 3.27, 3.12, 0.85, { fontSize: 10.5, valign: "top" });
    });
    s.addShape(pptx.ShapeType.rect, { x: 0.7, y: 5.02, w: 12.08, h: 1.05, fill: { color: C.ink }, line: { color: C.ink } });
    addText(s, "OWNERSHIP BEFORE MOVEMENT", 0.98, 5.19, 4.85, 0.45, { fontSize: 20, bold: true, color: C.white });
    addText(s, "blackwards-route-desk.indigo-iris-5804.chatgpt.site", 6.15, 5.19, 6.15, 0.45, { fontSize: 13, bold: true, color: C.green, align: "right" });
    addFooter(pptx, s, 6);
  }

  return pptx;
}

async function main() {
  const output = pptxPath("work/decks");
  fs.mkdirSync(output, { recursive: true });
  await buildLedgerDeck().writeFile({ fileName: path.join(output, "blackwards-route-desk-candidate-a-signal-ledger.pptx") });
  await buildRouteMapDeck().writeFile({ fileName: path.join(output, "blackwards-route-desk-candidate-b-route-map.pptx") });
  console.log(output);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
