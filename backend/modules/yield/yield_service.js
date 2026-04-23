const defillamaProvider = require("../providers/defillama_provider");

const stableTokens = ["USDC", "USDT", "DAI", "EURC", "PYUSD"];
const riskyStables = ["FRAX", "TUSD", "FDUSD", "USDS", "USDG", "USDY", "USX"];

const getPoolStrategy = (pool) => {
  if (pool.exposure === "multi") {
    return "LP";
  }

  if (pool.ilRisk === "no" && pool.stablecoin) {
    return "Lending";
  }

  return "Other";
};

const isSupportedPool = (pool) => {
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
};

exports.getYields = async () => {
  const pools = await defillamaProvider.getPools();

  return pools.filter(isSupportedPool).map((pool) => {
    const symbol = pool.symbol.trim().toUpperCase();

    return {
      protocol: pool.project,
      token: symbol,
      apy: pool.apy,
      tvl: pool.tvlUsd,
      type: stableTokens.includes(symbol) ? "safe" : "risky",
      strategy: getPoolStrategy(pool),
    };
  });
};

