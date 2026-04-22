"use client";

import { useState } from "react";
import Header from "@/composants/layout/header";
import YieldTable from "@/composants/yield/yield_Tables";

export default function ClientPage({ data }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  return (
    <>
      <Header
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        search={search}
        setSearch={setSearch}
      />

      <YieldTable data={data} activeFilter={activeFilter} search={search} />
    </>
  );
}
