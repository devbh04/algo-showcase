import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { STRATEGIES, StrategyItem } from "../../../data/strategies";
import MermaidDiagram from "../../../components/MermaidDiagram";


interface StrategyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return STRATEGIES.map((s) => ({
    id: s.id,
  }));
}

function StrategySkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-pulse">
      <div className="h-6 w-48 bg-[#f4f4f4] rounded-full" />
      <div className="h-12 w-3/4 bg-[#f4f4f4] rounded-lg" />
      <div className="h-72 w-full bg-[#f4f4f4] rounded-[20px]" />
      <div className="h-48 w-full bg-[#f4f4f4] rounded-[20px]" />
    </div>
  );
}

async function StrategyContent({ params }: StrategyPageProps) {
  const { id } = await params;
  const strategy = STRATEGIES.find((s) => s.id === id);

  if (!strategy) {
    notFound();
  }

  const isLive = strategy.id === "ema-options-engine";
  const otherStrategy = STRATEGIES.find((s) => s.id !== id) || STRATEGIES[0];

  const targetSpec = strategy.specs.find((s) => s.type === "target");
  const riskSpec = strategy.specs.find((s) => s.type === "risk");
  const remainingSpecs = strategy.specs.filter(
    (s) => s !== targetSpec && s !== riskSpec
  );

  return (
    <div
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-white text-[#191c1f]"
      style={{ backgroundColor: "#ffffff", color: "#191c1f" }}
    >
      {/* ── BREADCRUMB & HEADER ──────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#505a63]">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-[#191c1f] transition font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            B&amp;B Finance Overview
          </Link>
          <span className="font-mono text-[#8d969e]">{strategy.timeframe}</span>
        </div>

        {/* Header with Title and Fixed Button Orientation */}
        <div className="border-b border-[#e2e2e7] pb-8 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-[#f4f4f4] text-[#191c1f] border border-[#e2e2e7] flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isLive ? "bg-[#00a87e]" : "bg-[#494fdf]"
                  }`}
                />
                {strategy.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white border border-[#e2e2e7] text-[#505a63]">
                {strategy.assetClass}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#191c1f] display-heading">
              {strategy.title}
            </h1>
            <p className="text-base text-[#505a63] leading-relaxed max-w-3xl">
              {strategy.subtitle}
            </p>
          </div>

          {/* Clean Horizontal Action Links with Zero Text Wrapping */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={strategy.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="h-11 px-6 rounded-full text-xs font-medium bg-white hover:bg-[#f4f4f4] text-[#191c1f] border border-[#191c1f] transition inline-flex items-center gap-2 whitespace-nowrap shadow-sm"
            >
              <svg className="w-4 h-4 text-[#191c1f] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub Source Code
            </a>

            <a
              href={strategy.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="h-11 px-6 rounded-full text-xs font-medium bg-[#191c1f] hover:bg-black text-white transition inline-flex items-center gap-2 whitespace-nowrap shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#00a87e] shrink-0" />
              Launch Live Client
            </a>
          </div>
        </div>
      </div>

      {/* ── PRODUCT MOCKUP BANNER ────────────────────────────────── */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-[20px] overflow-hidden border border-[#e2e2e7] bg-[#090d16]">
        <Image
          src={strategy.bannerUrl}
          alt={strategy.title}
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* ── 1. WHAT THE STRATEGY ACTUALLY IS (VERTICAL SEQUENTIAL POINTS) ─ */}
      <div className="rounded-[20px] p-6 sm:p-8 bg-white border border-[#e2e2e7] space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-mono font-medium text-[#494fdf] tracking-wider uppercase">
            Strategy Mechanics
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#191c1f] tracking-tight">
            What the Strategy Actually Is
          </h2>
          <p className="text-xs sm:text-sm text-[#505a63]">
            Step-by-step mathematical logic and rule engine executed in sequential order.
          </p>
        </div>

        {/* Vertical Sequential Flow (Points stacked one below the other) */}
        <div className="relative pl-7 sm:pl-9 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#e2e2e7] space-y-7">
          {strategy.whatItActuallyIsPoints.map((pt, idx) => (
            <div key={idx} className="relative group">
              {/* Marker on vertical timeline rail */}
              <div
                className={`absolute -left-7 sm:-left-9 top-0.5 w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                  pt.tagType === "green"
                    ? "border-[#00a87e] text-[#00a87e]"
                    : pt.tagType === "red"
                    ? "border-[#e23b4a] text-[#e23b4a]"
                    : pt.tagType === "amber"
                    ? "border-[#f59e0b] text-[#b45309]"
                    : "border-[#494fdf] text-[#494fdf]"
                }`}
              >
                {pt.step}
              </div>

              {/* Step Content */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-[#191c1f]">
                    {pt.title}
                  </h3>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${
                      pt.tagType === "green"
                        ? "bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]"
                        : pt.tagType === "red"
                        ? "bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]"
                        : pt.tagType === "amber"
                        ? "bg-[#fffbeb] text-[#b45309] border border-[#fde68a]"
                        : "bg-[#eef2ff] text-[#494fdf] border border-[#c7d2fe]"
                    }`}
                  >
                    {pt.tag}
                  </span>
                </div>
                <p className="text-sm text-[#505a63] leading-relaxed">
                  {pt.lead}
                  <strong className="text-[#191c1f] font-semibold underline decoration-2 decoration-[#494fdf]/30">
                    {pt.highlight}
                  </strong>
                  {pt.trailing}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. TECHNICAL SPECIFICATIONS (DIRECTLY BELOW POINTS, HIGH POLISH) ─ */}
      <div className="rounded-[20px] p-6 sm:p-8 bg-white border border-[#e2e2e7] space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-medium text-[#494fdf] tracking-wider uppercase">
            Quantitative Specs
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#191c1f] tracking-tight">
            Strategy Specifications &amp; Payoff Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#505a63]">
            Mathematical expectancy, stop-loss limits, indicator formulas, and market universe.
          </p>
        </div>

        {/* Hero Dual Payoff & Risk Architecture Bar (Green & Red dynamic gauge) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Green Target Box */}
          <div className="p-5 sm:p-6 rounded-[16px] bg-[#f0fdf4] border border-[#bbf7d0] border-l-4 border-l-[#00a87e] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#047857] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00a87e]" />
                Target &amp; Payoff Edge
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white border border-[#bbf7d0] text-[#047857] font-semibold">
                Positive Expected Value
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-[#14532d] tracking-tight">
              {targetSpec?.value}
            </p>
            <p className="text-xs text-[#166534]">
              Codified profit milestone &amp; automated square-off limit
            </p>
          </div>

          {/* Red Risk Box */}
          <div className="p-5 sm:p-6 rounded-[16px] bg-[#fef2f2] border border-[#fecaca] border-l-4 border-l-[#e23b4a] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#b91c1c] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e23b4a]" />
                Risk &amp; Stop Protection
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white border border-[#fecaca] text-[#b91c1c] font-semibold">
                Capital Preservation
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-[#7f1d1d] tracking-tight">
              {riskSpec?.value}
            </p>
            <p className="text-xs text-[#991b1b]">
              Strict stop-loss exit preventing catastrophic drawdowns
            </p>
          </div>
        </div>

        {/* Parameter Spec Matrix (Cobalt Blue & Slate / Ink) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {remainingSpecs.map((spec, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-[14px] bg-[#f8f9fa] border border-[#e2e2e7] hover:border-[#191c1f] transition space-y-1.5 ${
                spec.type === "indicator"
                  ? "border-l-[3px] border-l-[#494fdf]"
                  : spec.type === "market"
                  ? "border-l-[3px] border-l-[#007bc2]"
                  : "border-l-[3px] border-l-[#191c1f]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                    spec.type === "indicator"
                      ? "text-[#494fdf]"
                      : spec.type === "market"
                      ? "text-[#007bc2]"
                      : "text-[#505a63]"
                  }`}
                >
                  {spec.category}
                </span>
                {spec.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#494fdf]" />
                )}
              </div>
              <p className="text-xs text-[#505a63] font-medium">{spec.label}</p>
              <p className="text-xs sm:text-sm font-bold text-[#191c1f] leading-snug">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. MERMAID AUTOMATION DIAGRAM (FIXED HEIGHT & CONTROLS) ─ */}
      <div className="rounded-[20px] p-6 sm:p-8 bg-white border border-[#e2e2e7] space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-medium text-[#494fdf] tracking-wider uppercase">
            Process Automation Flow
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#191c1f] tracking-tight">
            Strategy / Scanner Execution Diagram
          </h2>
          <p className="text-xs sm:text-sm text-[#505a63]">
            Interactive execution flowchart. Use the controls to zoom in, zoom out, reset, or drag to pan around.
          </p>
        </div>

        {/* Zoomable, fixed-height diagram */}
        <MermaidDiagram chart={strategy.mermaidChart} />
      </div>

      {/* ── 4. WHAT IS USED FOR IT (COMPACT ELEGANT TOOLING DOCK) ── */}
      <div className="rounded-[20px] p-6 sm:p-8 bg-white border border-[#e2e2e7] space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-medium text-[#494fdf] tracking-wider uppercase">
            Tooling &amp; Infrastructure
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#191c1f] tracking-tight">
            What is Used for It
          </h2>
          <p className="text-xs sm:text-sm text-[#505a63]">
            Compact runtime stack and mathematical engines powering this algorithm.
          </p>
        </div>

        {/* Tooling Badges */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          {strategy.whatIsUsedForIt.map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-[#f8f9fa] hover:bg-white text-[#191c1f] border border-[#e2e2e7] hover:border-[#191c1f] transition cursor-default shadow-xs"
              title={tech.purpose}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#494fdf]" />
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── 5. CROSS-NAVIGATION & LINK ───────────────────────────── */}
      <div className="p-8 rounded-[20px] bg-[#f4f4f4] border border-[#e2e2e7] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[11px] font-mono text-[#8d969e] uppercase tracking-wider">
            Explore Alternative Engine
          </span>
          <h3 className="text-lg font-semibold text-[#191c1f]">{otherStrategy.title}</h3>
          <p className="text-xs text-[#505a63]">{otherStrategy.subtitle}</p>
        </div>

        <Link
          href={`/strategy/${otherStrategy.id}`}
          className="px-6 py-3 rounded-full text-xs font-medium bg-[#191c1f] hover:bg-black text-white transition whitespace-nowrap shadow-sm"
        >
          View {otherStrategy.shortTitle} →
        </Link>
      </div>
    </div>
  );
}

export default function StrategyPage({ params }: StrategyPageProps) {
  return (
    <Suspense fallback={<StrategySkeleton />}>
      <StrategyContent params={params} />
    </Suspense>
  );
}
