"use client";
type Yield = {
  protocol: string;
  token: string;
  strategy: string;
  apy: number;
  tvl: number;
  type: string;
};

type SortBy = "none" | "apy-desc";

type ClientPageProps = {
  data: Yield[];
};
import { useState } from "react";
import Header from "@/composants/layout/header";
import YieldTable from "@/composants/yield/yield_Tables";

export default function ClientPage({ data }: ClientPageProps) {
  const [sortBy, setSortBy] = useState<SortBy>("none");
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  return (
    <>
      <Header
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <YieldTable
        data={data}
        activeFilter={activeFilter}
        search={search}
        sortBy={sortBy}
      />
    </>
  );
}
