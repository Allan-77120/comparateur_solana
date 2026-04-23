export type YieldRiskType = "safe" | "risky";

export type YieldStrategy = "LP" | "Lending" | "Other";

export type YieldPool = {
  protocol: string;
  token: string;
  strategy: YieldStrategy;
  apy: number;
  tvl: number;
  type: YieldRiskType;
};

type DefiLlamaPool = {
  chain?: string;
  symbol?: string;
  apy?: number;
  project?: string;
  tvlUsd?: number;
  exposure?: string;
  ilRisk?: string;
  stablecoin?: boolean;
};

type DefiLlamaResponse = {
  data: DefiLlamaPool[];
};

const stableTokens = ["USDC", "USDT", "DAI", "EURC", "PYUSD"];
const riskyStables = ["FRAX", "TUSD", "FDUSD", "USDS", "USDG", "USDY", "USX"];

export async function getYields(): Promise<YieldPool[]> {
  const response = await fetch("https://yields.llama.fi/pools", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load yield data");
  }

  const data = (await response.json()) as DefiLlamaResponse;

  return data.data
    .filter((pool) => {
      const symbol = pool.symbol?.trim().toUpperCase();

      return (
        pool.chain === "Solana" &&
        symbol &&
        typeof pool.apy === "number" &&
        pool.apy > 0 &&
        pool.project !== "project-0" &&
        (stableTokens.includes(symbol) ||
          riskyStables.includes(symbol) ||
          symbol === "SOL")
      );
    })
    .map((pool) => {
      const symbol = pool.symbol?.trim().toUpperCase() ?? "";

      const strategy: YieldStrategy =
        pool.exposure === "multi"
          ? "LP"
          : pool.ilRisk === "no" && pool.stablecoin
            ? "Lending"
            : "Other";

      return {
        protocol: pool.project ?? "unknown",
        token: symbol,
        apy: pool.apy ?? 0,
        tvl: pool.tvlUsd ?? 0,
        type: stableTokens.includes(symbol) ? "safe" : "risky",
        strategy,
      };
    });
}
