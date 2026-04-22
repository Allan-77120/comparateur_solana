"use client";
type HeaderProps = {
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
};
import Link from "next/link";
import Image from "next/image";
export default function Header({
  activeFilter,
  setActiveFilter,
  search,
  setSearch,
}: HeaderProps) {
  const filters = ["All", "Lending", "Other"];

  return (
    <div className="w-full">
      {/* HEADER */}
      <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-[#0B0B0D]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Image
            src="/solana.png"
            alt="Solana"
            width={70}
            height={70}
            className="w-40 h-10 object-contain"
          />

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-10 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition">
              Compare
            </Link>
            <Link href="/protocols" className="hover:text-white transition">
              Protocols
            </Link>
            <Link href="/learn" className="hover:text-white transition">
              Learn
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO + FILTERS */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        {/* TITLE */}
        <div className="mb-8">
          <p className="text-green-400 text-xs mb-4">
            ● SOLANA • STABLECOIN YIELDS
          </p>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Find the best{" "}
            <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              {" "}
              Solana yield
            </span>
            <br />
          </h1>

          <p className="text-white/50 mt-4 max-w-xl">
            Compare DeFi strategies with a complete view of returns and risks.
          </p>
        </div>

        {/* SEARCH + SORT */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search protocol, stablecoin..."
            className="flex-1 bg-[#111115] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-green-400"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <button className="bg-[#111115] border border-white/10 px-4 py-3 rounded-xl text-white/70 hover:text-white transition">
            Highest APY
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm border transition
                ${
                  activeFilter === filter
                    ? "bg-green-400 text-black border-green-400"
                    : "border-white/10 text-white/60 hover:text-white"
                }
              `}>
              {filter}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
