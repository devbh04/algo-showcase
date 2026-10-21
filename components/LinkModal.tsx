"use client";

import { useState } from "react";
import { STRATEGIES } from "../data/strategies";

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LinkModal({ isOpen, onClose }: LinkModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-[24px] bg-white border border-[#e2e2e7] shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e2e2e7] pb-4">
          <div>
            <span className="text-[11px] font-mono font-medium text-[#494fdf] uppercase tracking-wider">
              Quick Links
            </span>
            <h3 className="text-xl font-semibold text-[#191c1f] mt-0.5">
              Strategy Repositories &amp; Live Deployments
            </h3>
            <p className="text-xs text-[#505a63] mt-1">
              Direct source code access and live client deployments for each quantitative strategy.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#505a63] hover:text-[#191c1f] hover:bg-[#f4f4f4] transition shrink-0 ml-4"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Strategies Links List */}
        <div className="space-y-6">
          {STRATEGIES.map((strat) => (
            <div
              key={strat.id}
              className="p-5 sm:p-6 rounded-[20px] bg-[#f8f9fa] border border-[#e2e2e7] space-y-4"
            >
              {/* Strategy Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2e2e7] pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        strat.id === "ema-options-engine" ? "bg-[#00a87e]" : "bg-[#494fdf]"
                      }`}
                    />
                    <h4 className="text-sm sm:text-base font-semibold text-[#191c1f]">
                      {strat.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#505a63]">{strat.timeframe} • {strat.assetClass}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-white text-[#191c1f] border border-[#e2e2e7]">
                  {strat.badge}
                </span>
              </div>

              {/* Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* GitHub Box */}
                <div className="p-4 rounded-[14px] bg-white border border-[#e2e2e7] space-y-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#191c1f]">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      GitHub Repository
                    </div>
                    <button
                      onClick={() => copyToClipboard(strat.githubUrl, `gh-${strat.id}`)}
                      className="text-[11px] font-mono text-[#494fdf] hover:underline"
                    >
                      {copiedKey === `gh-${strat.id}` ? "✓ Copied" : "Copy URL"}
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-[#505a63] truncate">
                    {strat.githubUrl}
                  </p>
                  <a
                    href={strat.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-full text-xs font-medium text-center bg-[#191c1f] hover:bg-black text-white transition inline-flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    View Source
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Live Client Box */}
                <div className="p-4 rounded-[14px] bg-white border border-[#e2e2e7] space-y-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#191c1f]">
                      <span className="w-2 h-2 rounded-full bg-[#00a87e]" />
                      Live Deployment
                    </div>
                    <button
                      onClick={() => copyToClipboard(strat.liveUrl, `live-${strat.id}`)}
                      className="text-[11px] font-mono text-[#494fdf] hover:underline"
                    >
                      {copiedKey === `live-${strat.id}` ? "✓ Copied" : "Copy URL"}
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-[#505a63] truncate">
                    {strat.liveUrl}
                  </p>
                  <a
                    href={strat.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-full text-xs font-medium text-center bg-white hover:bg-[#f4f4f4] text-[#191c1f] border border-[#191c1f] transition inline-flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    Launch Client
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[#e2e2e7] pt-4 text-xs text-[#505a63]">
          <span>Configured in <code className="font-mono text-[#191c1f]">data/strategies.ts</code></span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-medium bg-[#191c1f] hover:bg-black text-white transition shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
