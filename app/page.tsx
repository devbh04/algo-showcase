"use client";

import { useState } from "react";
import StrategyCard from "../components/StrategyCard";
import LinkModal from "../components/LinkModal";
import { STRATEGIES } from "../data/strategies";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="w-full space-y-16 pb-20 bg-white text-[#191c1f]"
      style={{ backgroundColor: "#ffffff", color: "#191c1f" }}
    >
      {/* ── 1. HERO BAND (B&B FINANCE OVERVIEW) ────────────────────── */}
      <section
        className="pt-16 sm:pt-24 pb-14 border-b border-[#e2e2e7] bg-white text-[#191c1f]"
        style={{ backgroundColor: "#ffffff", color: "#191c1f" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4f4f4] border border-[#e2e2e7] text-xs font-medium text-[#191c1f]">
            <span className="w-2 h-2 rounded-full bg-[#494fdf]" />
            B&amp;B Finance • Quantitative Research Lab
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#191c1f] display-tight">
              Systematic Trading &amp; Derivative Architectures
            </h1>
            <p className="text-base sm:text-xl text-[#505a63] font-normal leading-relaxed max-w-2xl">
              An independent showcase of autonomous trading algorithms, options pricing models, and statistical backtest engines engineered for Indian capital markets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#strategies"
              className="px-6 py-3 rounded-full text-sm font-medium bg-[#191c1f] hover:bg-black text-white transition flex items-center gap-2 shadow-sm"
            >
              View Strategies
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-full text-sm font-medium bg-white hover:bg-[#f4f4f4] text-[#191c1f] border border-[#191c1f] transition shadow-sm"
            >
              Quick Links (Source &amp; Deployments)
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. STRATEGIES SHOWCASE CARDS (ONLY 2 THINGS ON HOMEPAGE) ─ */}
      <section
        id="strategies"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24 bg-white text-[#191c1f]"
        style={{ backgroundColor: "#ffffff", color: "#191c1f" }}
      >
        <div className="space-y-2">
          <span className="text-xs font-mono font-medium text-[#494fdf] uppercase tracking-wider">
            Engine Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#191c1f] display-heading">
            Algorithmic Strategies Showcase
          </h2>
          <p className="text-sm text-[#505a63] max-w-2xl leading-relaxed">
            Explore the technical architectures, mathematical formulations, and Python implementations of our production and backtest engines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {STRATEGIES.map((strategy) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}
        </div>
      </section>

      <LinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
