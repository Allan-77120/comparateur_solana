exports.getYields = async () => {
  const response = await fetch("https://yields.llama.fi/pools");
  const data = await response.json();
  const stableTokens = ["USDC", "USDT", "DAI", "EURC", "PYUSD"];
  const riskyStables = ["FRAX", "TUSD", "FDUSD", "USDS", "USDG", "USDY", "USX"];
  const filtered = data.data.filter(pool => {
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
  });
  const mapped = filtered.map(e => ({
    protocol: e.project,
    token: e.symbol,
    apy: e.apy,
    tvl: e.tvlUsd,
    type: stableTokens.includes(e.symbol) ? "safe" : "risky",
    strategy:
  e.exposure === "multi"
    ? "LP"
    : e.ilRisk === "no" && e.stablecoin
    ? "Lending"
    : "Other",
  }));

  return mapped;
};
