"use client";

import React from "react";
import { ChartTest } from "../components/chart";
import TimeTable from "../components/TimeTable";
import TimeTable2 from "../components/TimeTable2";

import { TimeProvider } from "@/components/TimeContext";

export default function Home() {
  return (
    <TimeProvider>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex gap-10">
          <TimeTable />
          <ChartTest />
        </div>
      </section>
    </TimeProvider>
  );
}
