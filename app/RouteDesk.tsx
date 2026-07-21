"use client";

import {
  ArrowRight,
  Check,
  Clipboard,
  Download,
  FileWarning,
  LockKeyhole,
  RefreshCw,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  SAMPLE_CASES,
  packetToMarkdown,
  type RoutePacket,
  type RouteRequest,
  validateRouteRequest,
} from "../lib/route-contract";

const initialRequest: RouteRequest = {
  routeType: "opportunity",
  summary: "",
  compensation: "unclear",
  rights: "unclear",
  credit: "unclear",
  audienceAccess: "unclear",
  urgency: "normal",
};

const labels = {
  routeType: {
    opportunity: "Opportunity",
    partnership: "Partnership",
    funding: "Funding",
    publishing: "Publishing",
  },
  compensation: {
    paid: "Paid fee",
    revenue_share: "Revenue share",
    unpaid: "Unpaid / exposure",
    unclear: "Not clear",
  },
  rights: {
    nonexclusive: "Nonexclusive license",
    exclusive: "Exclusive license",
    transfer: "Ownership transfer",
    unclear: "Not clear",
  },
  credit: {
    named: "Named credit",
    shared: "Shared / collective",
    none: "No credit",
    unclear: "Not clear",
  },
  audienceAccess: {
    none: "No audience access",
    limited: "Limited access",
    export: "Export requested",
    unclear: "Not clear",
  },
  urgency: {
    normal: "Normal review",
    "48_hours": "Within 48 hours",
    same_day: "Same day",
  },
} as const;

const verdictCopy = {
  proceed: { label: "Proceed", detail: "The visible route can move after the remaining terms are confirmed." },
  clarify: { label: "Clarify", detail: "Important terms are still doing work in the dark." },
  protect: { label: "Protect", detail: "Pause movement until ownership and benefit are rewritten." },
  pass: { label: "Pass", detail: "The visible exchange asks for more than it returns." },
};

export function RouteDesk() {
  const [form, setForm] = useState<RouteRequest>(initialRequest);
  const [packet, setPacket] = useState<RoutePacket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const characterCount = form.summary.length;
  const verdict = packet ? verdictCopy[packet.verdict] : null;
  const summaryStatus = useMemo(() => {
    if (!form.summary) return "Public-safe summary only";
    if (characterCount < 40) return `${40 - characterCount} more characters needed`;
    return `${1600 - characterCount} characters left`;
  }, [characterCount, form.summary]);

  function update<K extends keyof RouteRequest>(key: K, value: RouteRequest[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function loadSample(sample: (typeof SAMPLE_CASES)[number]) {
    setForm(sample.input);
    setPacket(sample.packet);
    setError("");
    setCopied(false);
    requestAnimationFrame(() => document.getElementById("route-result")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function submitRoute(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateRouteRequest(form);
    if (!validation.ok) {
      setError(validation.message);
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);
    try {
      const response = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.value),
      });
      const data = (await response.json()) as RoutePacket & { message?: string };
      if (!response.ok) throw new Error(data.message || "The live route did not complete.");
      setPacket(data);
      requestAnimationFrame(() => document.getElementById("route-result")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (routeError) {
      setError(routeError instanceof Error ? routeError.message : "The live route did not complete.");
    } finally {
      setLoading(false);
    }
  }

  async function copyPacket() {
    if (!packet) return;
    await navigator.clipboard.writeText(packetToMarkdown(packet));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function downloadPacket() {
    if (!packet) return;
    const blob = new Blob([packetToMarkdown(packet)], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `blackwards-route-${packet.routeId}.md`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function resetDesk() {
    setForm(initialRequest);
    setPacket(null);
    setError("");
    setCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main data-hydrated={hydrated ? "true" : "false"}>
      <header className="site-header">
        <a className="brand" href="#route-composer" aria-label="Auntie AI Blackwards Route Desk home">
          <Image src="/auntie-ai-mark.svg" alt="" width={42} height={42} priority />
          <span><strong>Auntie AI</strong><small>Blackwards Route Desk</small></span>
        </a>
        <div className="header-status" aria-label="Service boundaries">
          <span><i className="status-dot" /> GPT-5.6 live route</span>
          <span>No account. No retention.</span>
        </div>
        <a className="icon-link" href="https://black2africa.xyz" target="_blank" rel="noreferrer" aria-label="Open Black2Africa">
          <ArrowRight aria-hidden="true" />
        </a>
      </header>

      <section className="desk-intro" aria-labelledby="desk-title">
        <div>
          <p className="kicker">Work &amp; Productivity · OpenAI Build Week 2026</p>
          <h1 id="desk-title">Read the route before your work moves.</h1>
        </div>
        <p className="intro-copy">Turn the visible terms of an opportunity into an owner-first packet: what stays yours, what needs language, and what to do in the next 24 hours.</p>
      </section>

      <section className="route-workspace" id="route-composer" aria-label="Route packet composer">
        <form className="route-form" onSubmit={submitRoute} noValidate>
          <fieldset className="route-segments">
            <legend>1. Choose the route</legend>
            <div className="segment-grid">
              {Object.entries(labels.routeType).map(([value, label]) => (
                <label key={value} className={form.routeType === value ? "segment active" : "segment"}>
                  <input
                    type="radio"
                    name="routeType"
                    value={value}
                    checked={form.routeType === value}
                    onChange={() => update("routeType", value as RouteRequest["routeType"])}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="summary-field">
            <div className="field-heading">
              <label htmlFor="route-summary">2. Name what is being offered and asked</label>
              <span className={characterCount > 1600 ? "count over" : "count"}>{summaryStatus}</span>
            </div>
            <textarea
              id="route-summary"
              value={form.summary}
              onChange={(event) => update("summary", event.target.value)}
              maxLength={1600}
              rows={7}
              placeholder="Example: A campaign offers a flat fee for six months of use, asks for exclusivity across every channel, and has not specified credit or edit approval..."
              aria-describedby="summary-privacy"
            />
            <p id="summary-privacy" className="privacy-line"><LockKeyhole aria-hidden="true" /> Leave out names, email, phone, credentials, unpublished evidence, and private records.</p>
          </div>

          <fieldset className="terms-grid">
            <legend>3. Mark the visible terms</legend>
            <SelectField label="Compensation" value={form.compensation} options={labels.compensation} onChange={(value) => update("compensation", value as RouteRequest["compensation"])} />
            <SelectField label="Rights" value={form.rights} options={labels.rights} onChange={(value) => update("rights", value as RouteRequest["rights"])} />
            <SelectField label="Credit" value={form.credit} options={labels.credit} onChange={(value) => update("credit", value as RouteRequest["credit"])} />
            <SelectField label="Audience access" value={form.audienceAccess} options={labels.audienceAccess} onChange={(value) => update("audienceAccess", value as RouteRequest["audienceAccess"])} />
            <SelectField label="Urgency" value={form.urgency} options={labels.urgency} onChange={(value) => update("urgency", value as RouteRequest["urgency"])} />
          </fieldset>

          {error && <div className="form-error" role="alert"><FileWarning aria-hidden="true" /><span>{error}</span></div>}

          <button className="primary-action" type="submit" disabled={loading || !hydrated}>
            {loading ? <RefreshCw className="spin" aria-hidden="true" /> : <Sparkles aria-hidden="true" />}
            <span>{loading ? "Reading the route..." : "Build route packet"}</span>
          </button>
          <p className="boundary-copy">Decision support, not legal advice. You control negotiation, review, signature, payment, and acceptance.</p>
        </form>

        <aside className="sample-rail" aria-labelledby="sample-title">
          <div className="rail-heading">
            <p className="kicker">Always available</p>
            <h2 id="sample-title">Verified route cases</h2>
            <p>Open a complete synthetic packet without spending a live model run.</p>
          </div>
          <div className="sample-list">
            {SAMPLE_CASES.map((sample, index) => (
              <button key={sample.id} type="button" className="sample-row" onClick={() => loadSample(sample)} disabled={!hydrated}>
                <span className={`sample-index signal-${sample.packet.verdict}`}>{String(index + 1).padStart(2, "0")}</span>
                <span><small>{sample.eyebrow}</small><strong>{sample.label}</strong></span>
                <ArrowRight aria-hidden="true" />
              </button>
            ))}
          </div>
          <figure className="route-figure">
            <Image src="/black2africa-trade-map.svg" alt="Abstract Black2Africa route map connecting creator-owned points" width={900} height={520} />
            <figcaption>Old pattern: movement without ownership. Blackwards: ownership before movement.</figcaption>
          </figure>
        </aside>
      </section>

      {packet && verdict && (
        <section className={`route-result verdict-${packet.verdict}`} id="route-result" aria-live="polite">
          <div className="result-masthead">
            <div>
              <p className="kicker">Route packet · {packet.source === "live" ? "Live GPT-5.6" : "Verified synthetic sample"}</p>
              <div className="verdict-line">
                <span className="verdict-label">{verdict.label}</span>
                <h2>{verdict.detail}</h2>
              </div>
            </div>
            <div className="result-actions">
              <button type="button" onClick={copyPacket} aria-label="Copy route packet" title="Copy route packet">
                {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button type="button" onClick={downloadPacket} aria-label="Download route packet" title="Download route packet">
                <Download aria-hidden="true" /><span>Download</span>
              </button>
              <button type="button" onClick={resetDesk} aria-label="Start a new route" title="Start a new route">
                <RefreshCw aria-hidden="true" /><span>New route</span>
              </button>
            </div>
          </div>

          <div className="route-reading">
            <p className="section-number">00</p>
            <div><h3>Route reading</h3><p>{packet.summary}</p></div>
          </div>

          <div className="packet-grid">
            <PacketSection number="01" title="What stays yours" icon={<ShieldCheck />} items={packet.ownershipChecks} />
            <PacketSection number="02" title="Extraction signals" icon={<FileWarning />} items={packet.extractionSignals} />
            <PacketSection number="03" title="Questions before yes" icon={<Route />} items={packet.questionsBeforeYes} />
            <PacketSection number="04" title="Receipt checklist" icon={<Clipboard />} items={packet.receiptChecklist} />
          </div>

          <div className="next-action">
            <span>24-hour move</span>
            <p>{packet.nextAction}</p>
            <ArrowRight aria-hidden="true" />
          </div>

          <footer className="packet-footer">
            <p>{packet.boundaryNote}</p>
            <div>
              <span>{packet.model}</span>
              <span>{packet.generatedAt}</span>
              {packet.quota && <span>{packet.quota.actorRemaining} personal live routes left today</span>}
            </div>
          </footer>
        </section>
      )}

      <footer className="site-footer">
        <div><Image src="/auntie-ai-mark.svg" alt="" width={34} height={34} /><span>Auntie AI by Black2Africa</span></div>
        <p>Built with Codex and GPT-5.6 for OpenAI Build Week 2026.</p>
        <a href="https://black2africa.xyz" target="_blank" rel="noreferrer">Visit Black2Africa <ArrowRight aria-hidden="true" /></a>
      </footer>
    </main>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Record<string, string>;
  onChange: (value: string) => void;
}) {
  const id = `term-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <label className="select-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {Object.entries(options).map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}

function PacketSection({ number, title, icon, items }: { number: string; title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <section className="packet-section">
      <div className="packet-section-heading">
        <span className="section-number">{number}</span>
        <h3>{title}</h3>
        <span className="section-icon" aria-hidden="true">{icon}</span>
      </div>
      <ul>{items.map((item, index) => <li key={`${number}-${index}`}>{item}</li>)}</ul>
    </section>
  );
}
