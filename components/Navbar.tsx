"use client";

import Link from "next/link";
import { useState } from "react";
import LinkModal from "./LinkModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#e2e2e7] bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-[#191c1f] flex items-center justify-center text-white font-bold text-xs tracking-tighter">
              B&amp;B
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-base tracking-tight text-[#191c1f]">
                  B&amp;B Finance
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#494fdf]" />
              </div>
              <p className="text-[11px] text-[#505a63] font-normal leading-none hidden sm:block">
                Bhangale &amp; Bodke
              </p>
            </div>
          </Link>

          {/* Right Action: Quick Links Modal Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-full text-xs font-medium text-[#191c1f] bg-[#f4f4f4] hover:bg-[#e8e8ed] border border-[#e2e2e7] transition flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3.5 h-3.5 text-[#505a63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Quick Links
            </button>
          </div>
        </div>
      </header>

      <LinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
