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
  const [selectedTracks, setSelectedTracks] = useState(new Set([tracks[0].key]));
  const [selectedModes, setSelectedModes] = React.useState(new Set(["quali", "practice", "race"]));

  const selectedModesValue = React.useMemo(
    () => modes.map(m =>  Array.from(selectedModes).includes(m.key) ? m.label : null).filter(m => m).join(", ").replaceAll("_", " "),
    [selectedModes]
  );

  const selectedTrackssValue = React.useMemo(
    () => tracks.map(m =>  Array.from(selectedTracks).includes(m.key) ? m.label : null).filter(m => m).join(", ").replaceAll("_", " "),
    [selectedTracks]
  );

  return (
    <TimeProvider>

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Dropdowns */}
        <div className="flex flex-col xl:flex-row gap-4 w-full justify-start">
     
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="capitalize"
                endContent={<ChevronDownIcon className="text-small" />}
              >
                {selectedModesValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Modes Selection"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={selectedModes}
              onSelectionChange={setSelectedModes}
            >
              {modes.map((mode) => (
                <DropdownItem key={mode.key} className="capitalize">
                  {capitalize(mode.label)}
                </DropdownItem>
              ))}
              
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger >
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
              >
                {selectedTrackssValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Track Selection"
              selectionMode="single"
              selectedKeys={selectedTracks}
              onSelectionChange={setSelectedTracks}
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
            <TimeTable modeFilter={selectedModes} trackFilter={selectedTracks} />
          </div>
          <div className="w-full xl:w-1/2">
            <ChartTest />
          </div>
        </div>

        {/* Contenedor que se mostrará solo en pantallas pequeñas */}
        <div className="flex xl:hidden flex-col gap-10 w-full">
          <TimeTable modeFilter={selectedModes} trackFilter={selectedTracks} />
          <ChartTest />
        </div>
      </section>
    </TimeProvider>
  );
}