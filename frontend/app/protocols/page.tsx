import Link from "next/link";
import { getProtocolMetadata } from "@/lib/protocols";

type Yield = {
  protocol: string;
  token: string;
  strategy: string;
  apy: number;
  tvl: number;
  type: string;
};

type ProtocolSummary = {
  protocol: string;
  totalTvl: number;
  averageApy: number;
  poolCount: number;
  strategies: string[];
  hasRiskyPool: boolean;
};

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: value >= 1_000_000 ? "compact" : "standard",
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

function buildProtocolSummaries(data: Yield[]): ProtocolSummary[] {
  const summaries = new Map<string, Yield[]>();

  for (const item of data) {
    const protocolPools = summaries.get(item.protocol) ?? [];
    protocolPools.push(item);
    summaries.set(item.protocol, protocolPools);
  }

  return Array.from(summaries.entries())
    .map(([protocol, pools]) => {
      const totalTvl = pools.reduce(
        (total, pool) => total + Number(pool.tvl || 0),
        0
      );
      const averageApy =
        pools.reduce((total, pool) => total + Number(pool.apy || 0), 0) /
        pools.length;

      return {
        protocol,
        totalTvl,
        averageApy,
        poolCount: pools.length,
        strategies: Array.from(new Set(pools.map((pool) => pool.strategy))),
        hasRiskyPool: pools.some((pool) => pool.type === "risky"),
      };
    })
    .sort((a, b) => b.totalTvl - a.totalTvl);
}

export default async function ProtocolsPage() {
  const res = await fetch("http://localhost:3000/yields", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Unable to load protocols");
  }

  const data: Yield[] = await res.json();
  const protocols = buildProtocolSummaries(data);

  return (
    <main className="min-h-screen bg-[#0B0B0D] text-white">
      <section className="max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-sm text-white/50 hover:text-white">
            Back to compare
          </Link>
          <Link href="/" className="text-sm text-[#14F195] hover:text-white">
            Compare yields
          </Link>
        </nav>

        <div className="mt-10">
          <p className="text-xs text-green-400">SOLANA PROTOCOLS</p>
          <h1 className="mt-3 text-4xl font-bold">Protocols</h1>
          <p className="mt-4 max-w-2xl text-white/55">
            Browse the Solana protocols currently available in the yield data,
            then open a detail page to inspect pools, TVL, APY, and known risks.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {protocols.map((item) => {
            const metadata = getProtocolMetadata(item.protocol);
            const risk = item.hasRiskyPool ? "Medium" : metadata.risk;

            return (
              <article
                key={item.protocol}
                className="rounded-2xl border border-white/10 bg-[#111115] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{metadata.name}</h2>
                    <p className="mt-1 text-xs text-white/40">
                      {item.poolCount} pools
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300">
                    {risk} risk
                  </span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-white/50">
                  {metadata.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-white/35">Total TVL</p>
                    <p className="mt-1 font-semibold">
                      {formatUsd(item.totalTvl)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/35">Average APY</p>
                    <p className="mt-1 font-semibold text-green-400">
                      {formatPercent(item.averageApy)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.strategies.map((strategy) => (
                    <span
                      key={strategy}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60"
                    >
                      {strategy}
                    </span>
                  ))}
                </div>

                {metadata.officialUrl && (
                  <a
                    href={metadata.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex rounded-xl bg-[#14F195] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#7fffd4]"
                  >
                    Open official site
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
