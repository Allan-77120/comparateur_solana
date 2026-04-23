"use client";

import { useState } from "react";
import Header from "@/composants/layout/header";
import YieldTable from "@/composants/yield/yield_Tables";
import type { SortBy, StrategyFilter } from "@/lib/types";
import type { YieldPool } from "@/lib/yields";

type ClientPageProps = {
  data: YieldPool[];
};

export default function ClientPage({ data }: ClientPageProps) {
  const [sortBy, setSortBy] = useState<SortBy>("none");
  const [activeFilter, setActiveFilter] = useState<StrategyFilter>("All");
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
