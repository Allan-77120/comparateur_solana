"use client";

import { protocolMetadata } from "@/lib/protocols";
import type { SortBy, StrategyFilter } from "@/lib/types";
import type { YieldPool } from "@/lib/yields";

type YieldTableProps = {
  data: YieldPool[];
  activeFilter: StrategyFilter;
  search: string;
  sortBy: SortBy;
};
export default function YieldTable({
  data,
  activeFilter,
  search,
  sortBy,
}: YieldTableProps) {
  const MIN_TVL = 20000;
  const MIN_APY = 2;
  const searchLower = search.trim().toLowerCase();

  const filteredData = data.filter((item) => {
    const matchesFilter =
      activeFilter === "All" || item.strategy === activeFilter;

    const matchesSearch =
      item.protocol.toLowerCase().includes(searchLower) ||
      item.token.toLowerCase().includes(searchLower) ||
      item.strategy.toLowerCase().includes(searchLower);

    const matchesApy = item.apy >= MIN_APY;

    const matchesTvl = item.tvl >= MIN_TVL;

    return matchesFilter && matchesSearch && matchesApy && matchesTvl;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "apy-desc") {
      return Number(b.apy || 0) - Number(a.apy || 0);
    }

    return 0;
  });

  return (
    <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
      {sortedData.map((item, index) => {
        const metadata = protocolMetadata[item.protocol];
        const isSafe = item.type === "safe";

        return (
          <article
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-[#9945FF]/40 hover:bg-white/[0.05] hover:shadow-[0_18px_45px_rgba(153,69,255,0.22),0_0_28px_rgba(20,241,149,0.14)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#9945FF] via-[#14F195] to-[#9945FF] opacity-0 transition group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-white">
                  {item.protocol}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70">
                    {item.token}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      isSafe
                        ? "bg-[#14F195]/10 text-[#14F195]"
                        : "bg-yellow-400/10 text-yellow-300"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-2xl font-bold leading-none text-[#14F195]">
                  {item.apy.toFixed(2)}%
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/35">
                  APY
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-[#111115]/80 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                Total value locked
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                ${(item.tvl / 1_000_000).toFixed(2)}M
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/65">
                  {item.strategy}
                </span>
              </div>

              {metadata?.officialUrl && (
                <a
                  href={metadata.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl border border-[#14F195]/30 bg-[#14F195]/10 px-3 py-2 text-xs font-semibold text-[#14F195] transition hover:bg-[#14F195] hover:text-black"
                >
                  Open
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
