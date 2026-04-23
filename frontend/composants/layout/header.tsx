"use client";

import Link from "next/link";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

type SortBy = "none" | "apy-desc";

type HeaderProps = {
  activeFilter: string;
  setActiveFilter: (value: string) => void;
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
  const filters = ["All", "Lending", "Other"];
  const isHighestApyActive = sortBy === "apy-desc";

  return (
    <div className="w-full">
      {/* HEADER */}
      <header className="fixed left-0 top-0 z-50 w-full backdrop-blur-xl bg-[#0B0B0D]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/solana.png"
              alt="Solana"
              width={70}
              height={70}
              className="w-40 h-10 object-contain"
            />
          </Link>
        </div>
      </header>

      {/* HERO + FILTERS */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-6">
        <div className="mb-8">
          <p className="text-green-400 text-xs mb-4">
            ● SOLANA • STABLECOIN YIELDS
          </p>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Find the best{" "}
            <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Solana yield
            </span>
          </h1>

          <p className="text-white/50 mt-4 max-w-xl">
            Compare DeFi strategies with a complete view of returns and risks.
          </p>

          <Link
            href="/protocols"
            className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-[#14F195]/50 hover:text-white"
          >
            View protocols
          </Link>
        </div>

        {/* SEARCH + SORT */}
        <div className="flex gap-4 mb-6 relative z-30">
          <input
            type="text"
            placeholder="Search protocol, stablecoin..."
            className="flex-1 bg-[#111115] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-green-400"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <button
            type="button"
            onClick={() =>
              setSortBy(currentSort =>
                currentSort === "apy-desc" ? "none" : "apy-desc",
              )
            }
            className={`border px-4 py-3 rounded-xl transition overflow-hidden ${
              isHighestApyActive
                ? "bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-origin-border text-black border-transparent"
                : "bg-[#111115] border-white/10 text-white/70 hover:text-white"
            }`}>
            Highest APY
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                activeFilter === filter
                  ? "bg-green-400 text-black border-green-600"
                  : "border-white/10 text-white/60 hover:text-white"
              }`}>
              {filter}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
