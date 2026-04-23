export type ProtocolRisk = "Low" | "Medium" | "High";

export type ProtocolMetadata = {
  name: string;
  description: string;
  officialUrl?: string;
  risk: ProtocolRisk;
  risks: {
    stablecoin: string;
    smartContract: string;
    liquidity: string;
    apyVolatility: string;
  };
};

const defaultRisks = {
  stablecoin: "Stablecoin assets can lose their peg or trade with temporary liquidity stress.",
  smartContract: "The protocol depends on smart contracts that can contain bugs or be upgraded.",
  liquidity: "Lower TVL pools can be harder to enter or exit without worse execution.",
  apyVolatility: "Displayed APY can change quickly as deposits, borrows, and incentives move.",
};

export const protocolMetadata: Record<string, ProtocolMetadata> = {
  "jupiter-lend": {
    name: "Jupiter Lend",
    description:
      "Jupiter Lend is a lending market on Solana connected to the Jupiter ecosystem.",
    officialUrl: "https://jup.ag/lend",
    risk: "Medium",
    risks: defaultRisks,
  },
  "kamino-lend": {
    name: "Kamino Lend",
    description:
      "Kamino Lend is a Solana lending protocol with markets for stablecoins and SOL assets.",
    officialUrl: "https://app.kamino.finance/lending",
    risk: "Medium",
    risks: defaultRisks,
  },
  save: {
    name: "Save",
    description:
      "Save is a Solana DeFi protocol offering lending and yield opportunities across several assets.",
    officialUrl: "https://save.finance",
    risk: "Medium",
    risks: defaultRisks,
  },
  loopscale: {
    name: "Loopscale",
    description:
      "Loopscale is a Solana lending protocol focused on yield markets and borrow/lend strategies.",
    officialUrl: "https://app.loopscale.com",
    risk: "Medium",
    risks: defaultRisks,
  },
  "ondo-yield-assets": {
    name: "Ondo Yield Assets",
    description:
      "Ondo Yield Assets exposes tokenized yield products that can appear in Solana yield markets.",
    officialUrl: "https://ondo.finance",
    risk: "Medium",
    risks: defaultRisks,
  },
};

export function getProtocolMetadata(protocol: string): ProtocolMetadata {
  return (
    protocolMetadata[protocol] ?? {
      name: protocol,
      description:
        "No protocol description is available yet. The data below is built from the yield pools currently returned by the app.",
      risk: "Medium",
      risks: defaultRisks,
    }
  );
}

