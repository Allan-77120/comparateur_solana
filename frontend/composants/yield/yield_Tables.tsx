"use client";

import { protocolMetadata } from "@/lib/protocols";

type Yield = {
  protocol: string;
  token: string;
  strategy: string;
  apy: number;
  tvl: number;
  type: string;
};

type SortBy = "none" | "apy-desc";

type YieldTableProps = {
  data: Yield[];
  activeFilter: string;
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
  const filteredData = data.filter((item) => {
    const matchesFilter =
      activeFilter === "All" || item.strategy === activeFilter;

    const searchLower = (search || "").toLowerCase();

    const matchesSearch =
      (item.protocol || "").toLowerCase().includes(searchLower) ||
      (item.token || "").toLowerCase().includes(searchLower) ||
      (item.strategy || "").toLowerCase().includes(searchLower);

    const matchesApy = (item.apy || 0) >= MIN_APY;

    const matchesTvl = (item.tvl || 0) >= MIN_TVL;

    return matchesFilter && matchesSearch && matchesApy && matchesTvl;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "apy-desc") {
      return Number(b.apy || 0) - Number(a.apy || 0);
    }

    return 0;
  });

  return (
    <div className="p-8 grid md:grid-cols-1 lg:grid-cols-3 gap-6">
      {sortedData.map((item, index) => {
        const metadata = protocolMetadata[item.protocol];

        return (
          <div
            key={index}
            className="bg-[#111115] border border-white/10 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(153,69,255,0.3),0_0_20px_rgba(20,241,149,0.2)] hover:border-[#9945FF]/40"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-white font-semibold text-sm">
                  {item.protocol}
                </p>
                <p className="text-white/50 text-xs">{item.token}</p>
              </div>

              <div className="text-right">
                <p className="text-green-400 font-bold text-lg">
                  {item.apy.toFixed(2)}%
                </p>
                <p className="text-white/40 text-xs">APY</p>
              </div>
            </div>

            <div className="mb-4 text-white/60 text-sm">
              TVL: ${(item.tvl / 1_000_000).toFixed(2)}M
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/70">
                  {item.strategy}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    item.type === "safe"
                      ? "bg-green-400/20 text-green-400"
                      : "bg-yellow-400/20 text-yellow-400"
                  }`}
                >
                  {item.type}
                </span>
              </div>

              {metadata?.officialUrl && (
                <a
                  href={metadata.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-[#14F195] text-black hover:bg-[#7fffd4] transition"
                >
                  Open
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
