"use client";

export default function YieldTable({ data, activeFilter }) {
  const filteredData =
    activeFilter === "All"
      ? data
      : data.filter(item => item.strategy === activeFilter);

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="bg-[#111115] border border-white/10 rounded-2xl p-5 
          transition-all duration-300 
          hover:-translate-y-2 
          hover:shadow-[0_10px_30px_rgba(153,69,255,0.3),0_0_20px_rgba(20,241,149,0.2)] 
          hover:border-[#9945FF]/40">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-white font-semibold text-sm">
                {item.protocol}
              </p>
              <p className="text-white/50 text-xs">{item.token}</p>
            </div>

            {/* APY */}
            <div className="text-right">
              <p className="text-green-400 font-bold text-lg">
                {item.apy.toFixed(2)}%
              </p>
              <p className="text-white/40 text-xs">APY</p>
            </div>
          </div>

          {/* TVL */}
          <div className="mb-4 text-white/60 text-sm">
            TVL: ${(item.tvl / 1_000_000).toFixed(2)}M
          </div>

          {/* TAGS */}
          <div className="flex gap-2 flex-wrap">
            {/* Strategy */}
            <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/70">
              {item.strategy}
            </span>

            {/* Risk */}
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                item.type === "safe"
                  ? "bg-green-400/20 text-green-400"
                  : "bg-yellow-400/20 text-yellow-400"
              }`}>
              {item.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
