"use client";

import Image from "next/image";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { strategyFilters, type SortBy, type StrategyFilter } from "@/lib/types";

type HeaderProps = {
  activeFilter: StrategyFilter;
  setActiveFilter: (value: StrategyFilter) => void;
  search: string;
  setSearch: (value: string) => void;
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
};

export default function Header({
  activeFilter,
  setActiveFilter,
  search,
  setSearch,
  sortBy,
  setSortBy,
}: HeaderProps) {
  const isHighestApyActive = sortBy === "apy-desc";

  return (
    <div className="w-full">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-[#0B0B0D]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/solana.png"
              alt="Solana"
              width={70}
              height={70}
              className="h-10 w-40 object-contain"
            />
          </Link>
        </div>
      </header>

      <section className="relative z-20 mx-auto max-w-7xl px-6 pb-6 pt-32">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#14F195]/20 bg-[#14F195]/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#14F195]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#14F195] shadow-[0_0_12px_rgba(20,241,149,0.9)]" />
            <span>Solana</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Stablecoin yields</span>
          </div>

          <h1 className="text-5xl font-bold leading-tight text-white">
            Find the best{" "}
            <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Solana yield
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-white/50">
            Compare DeFi strategies with a complete view of returns and risks.
          </p>

          <Link
            href="/protocols"
            className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-[#14F195]/50 hover:text-white"
          >
            View protocols
          </Link>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl md:flex-row">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#111115] px-4 py-3 transition focus-within:border-[#14F195]/50">
            <svg
              aria-hidden="true"
              className="h-4 w-4 text-white/35"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="m21 21-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>

            <input
              type="text"
              placeholder="Search protocol or stablecoin"
              className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <button
            type="button"
            onClick={() =>
              setSortBy((currentSort) =>
                currentSort === "apy-desc" ? "none" : "apy-desc"
              )
            }
            className={`overflow-hidden rounded-xl border px-4 py-3 transition ${
              isHighestApyActive
                ? "border-[#14F195]/50 bg-white/5 text-white"
                : "border-white/10 bg-white/5 text-white/80 hover:border-[#14F195]/50 hover:text-white"
            }`}
          >
            Highest APY
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {strategyFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeFilter === filter
                  ? "border-green-600 bg-green-400 text-black"
                  : "border-white/10 text-white/60 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
