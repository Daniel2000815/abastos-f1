import React from "react";
import { ChartTest } from "../components/chart";
import TimeTable from "../components/TimeTable";
import { TimeProvider } from "@/components/TimeContext";

export default function Home() {
  return (
    <TimeProvider>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Contenedor que se mostrará en pantallas extra grandes */}
        <div className="hidden xl:flex gap-10 w-full"> {/* Cambia md a xl para que sea horizontal solo en pantallas extra grandes */}
          <div className="w-full xl:w-1/2"> {/* Cambia md a xl */}
            <TimeTable />
          </div>
          <div className="w-full xl:w-1/2"> {/* Cambia md a xl */}
            <ChartTest />
          </div>
        </div>

        {/* Contenedor que se mostrará solo en pantallas pequeñas */}
        <div className="flex xl:hidden flex-col gap-10 w-full"> {/* Cambia md a xl */}
          <TimeTable />
          <ChartTest />
        </div>
      </section>
    </TimeProvider>
  );
}
