const DEFILLAMA_POOLS_URL = "https://yields.llama.fi/pools";

exports.getPools = async () => {
  const response = await fetch(DEFILLAMA_POOLS_URL);

  if (!response.ok) {
    throw new Error(`DefiLlama request failed with status ${response.status}`);
  }

  const data = await response.json();

  return Array.isArray(data.data) ? data.data : [];
};

