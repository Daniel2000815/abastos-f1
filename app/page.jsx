'use client'
import React, { useState } from "react";
import { ChartTest } from "../components/chart";
import TimeTable from "../components/TimeTable";
import { TimeProvider } from "@/components/TimeContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider } from "@nextui-org/react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { tracks, modes } from "@/config/static-data";
import { capitalize } from "../utils/stringUtils";

// const modes = [
//   { key: "mode1", label: "Mode 1" },
//   { key: "mode2", label: "Mode 2" },
//   { key: "mode3", label: "Mode 3" },
// ];

// const tracks = [
//   { key: "track1", label: "Track 1" },
//   { key: "track2", label: "Track 2" },
//   { key: "track3", label: "Track 3" },
// ];

export default function Home() {
  const [modeFilter, setModeFilter] = useState("all");
  const [trackFilter, setTrackFilter] = useState(new Set(tracks[0].label));

  return (
    <TimeProvider>
      
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Dropdowns */}
        <div className="flex flex-col xl:flex-row gap-4 w-full justify-between">
        <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Mode
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={modeFilter}
                selectionMode="multiple"
                onSelectionChange={setModeFilter}
              >
                {modes.map((mode) => (
                  <DropdownItem key={mode.key} className="capitalize">
                    {capitalize(mode.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Track
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Track Selection"
              selectionMode="single"
              selectedKeys={trackFilter}
              onSelectionChange={setTrackFilter}
            >
              {tracks.map((track) => (
                <DropdownItem key={track.key} className="capitalize">
                  {track.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <Divider className="my-4" />

        {/* Contenedor que se mostrará en pantallas extra grandes */}
        <div className="hidden xl:flex gap-10 w-full">
          <div className="w-full xl:w-1/2">
            <TimeTable modeFilter={modeFilter} trackFilter={trackFilter}/>
          </div>
          <div className="w-full xl:w-1/2">
            <ChartTest />
          </div>
        </div>

        {/* Contenedor que se mostrará solo en pantallas pequeñas */}
        <div className="flex xl:hidden flex-col gap-10 w-full">
          <TimeTable modeFilter={modeFilter} trackFilter={trackFilter}/>
          <ChartTest />
        </div>
      </section>
    </TimeProvider>
  );
}