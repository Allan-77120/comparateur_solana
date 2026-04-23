# Solana Yield Comparator

Next.js frontend for comparing Solana DeFi yield opportunities from DefiLlama.

## Features

- Compare yield pools by protocol, token, APY, TVL, strategy, and risk type.
- Search by protocol, token, or strategy.
- Sort by highest APY.
- Browse protocol summaries on `/protocols`.

## Development

```bash
npm run dev
```

The app fetches yield data directly from `https://yields.llama.fi/pools`.

## Checks

```bash
npm run lint
npm run build
```

