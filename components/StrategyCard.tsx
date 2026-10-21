"use client";

import Link from "next/link";
import Image from "next/image";
import { StrategyItem } from "../data/strategies";

interface StrategyCardProps {
  strategy: StrategyItem;
}

export default function StrategyCard({ strategy }: StrategyCardProps) {
  const isLive = strategy.id === "ema-options-engine";

  return (
    <div className="bg-white border border-[#e2e2e7] hover:border-[#c9c9cd] rounded-[20px] p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-200">
      <div className="space-y-6">
        {/* Header pill & Status */}
        <div className="flex items-center justify-between">
          <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-[#f4f4f4] text-[#191c1f] border border-[#e2e2e7] flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? "bg-[#00a87e]" : "bg-[#494fdf]"
              }`}
            />
            {strategy.badge}
          </span>
          <span className="text-xs text-[#505a63] font-mono">
            {strategy.timeframe}
          </span>
        </div>

        {/* Visual Product/Terminal Mockup */}
        <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden border border-[#e2e2e7] bg-[#0b0f19]">
          <Image
            src={strategy.bannerUrl}
            alt={strategy.title}
            fill
            className="object-cover object-top hover:scale-[1.02] transition-transform duration-500 ease-out"
          />
        </div>

        {/* Title & Short Description */}
        <div className="space-y-2">
          <h3 className="text-2xl font-medium tracking-tight text-[#191c1f]">
            {strategy.title}
          </h3>
          <p className="text-xs font-mono text-[#8d969e]">
            {strategy.assetClass}
          </p>
          <p className="text-sm text-[#505a63] leading-relaxed line-clamp-3">
            {strategy.shortDescription}
          </p>
        </div>
      </div>

      {/* Action Buttons: Direct Nav, Direct GitHub & Direct Live Client */}
      <div className="space-y-3 pt-2">
        <Link
          href={`/strategy/${strategy.id}`}
          className="w-full py-3 px-6 rounded-full text-sm font-medium text-white bg-[#191c1f] hover:bg-black transition flex items-center justify-between group shadow-sm"
        >
          <span>Explore Strategy Architecture &amp; Logic</span>
          <svg
            className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

        <div className="flex items-center gap-2.5">
          <a
            href={strategy.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 px-4 rounded-full text-xs font-medium text-[#191c1f] bg-white hover:bg-[#f4f4f4] border border-[#191c1f] transition text-center inline-flex items-center justify-center gap-1.5 shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            GitHub Source
          </a>
          <button
            disabled
            className="flex-1 py-2.5 px-4 rounded-full text-xs font-medium text-[#8d969e] bg-[#f4f4f4] border border-[#e2e2e7] cursor-not-allowed text-center inline-flex items-center justify-center gap-1.5"
            title="servers are down"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e23b4a]" />
            servers are down
          </button>
        </div>
      </div>
    </div>
  );
}
