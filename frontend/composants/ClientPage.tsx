"use client";

import { useState } from "react";
import Header from "@/composants/layout/header";
import YieldTable from "@/composants/yield/yield_Tables";

export default function ClientPage({ data }) {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <>
      <Header
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <YieldTable
        data={data}
        activeFilter={activeFilter}
      />
    </>
  );
}