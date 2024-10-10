'use client'

import React, { useContext } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import { useTime } from '@/components/TimeContext';
import { modes, users, tracks, weathers } from '@/config/static-data';

import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { capitalize } from "../utils/stringUtils";
import TimeModal from "./TimeModal";
import { secondsToTimeString, timeStringToSeconds } from '@/utils/raceUtils';

const columns = [
  { name: "PILOT", uid: "user", sortable: true },
  { name: "TIME", uid: "time", sortable: true },
  { name: "TRACK", uid: "track", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "MODE", uid: "mode", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const modeColorMap: Record<string, ChipProps["color"]> = {
  "practice": "success",
  "race": "danger",
  "quali": "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["user", "track", "time"];


export default function TimeTable(props: any) {
  const { times, setFilteredTimes } = useTime();  // Obtener los tiempos del contexto
  type User = typeof times[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "time",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(times.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredTimes = [...times];

    if (hasSearchFilter) {
      filteredTimes = filteredTimes.filter((time) =>
        [time.user, time.track].map(u => u.toLowerCase()).some(u => u.includes(filterValue.toLowerCase())),
      );
    }
    if (props.modeFilter !== "all" && Array.from(props.modeFilter).length !== modes.length) {
      console.log(props.modeFilter, filteredTimes)
      filteredTimes = filteredTimes.filter((user) =>
        Array.from(props.modeFilter).includes(user.mode.toLowerCase()),
      );
    }

    if (props.trackFilter !== "all" && Array.from(props.trackFilter).length !== tracks.length) {
      console.log("track filter", props.trackFilter, filteredTimes)
      filteredTimes = filteredTimes.filter((user) =>
        Array.from(props.trackFilter).includes(user.track.toLowerCase()),
      );
    }

    setFilteredTimes(filteredTimes)
    return filteredTimes;
  }, [times, filterValue, props.modeFilter, props.trackFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {

      var first = a[sortDescriptor.column as keyof User];
      var second = b[sortDescriptor.column as keyof User];

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    console.log("rendering ", user)
    switch (columnKey) {
      case "user":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: users.find(u => u?.key === cellValue)?.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            // description={user.date?.toDate().toLocaleString()}
            name={users.find(u => u?.key === cellValue)?.label}
          >
            {user.date?.toLocaleString()}
          </User>
        );
      case "track":
        return (
          <div className="flex flex-row items-center gap-2">
            <div>
              <p className="text-bold text-small capitalize">{tracks.find(u => u?.key === cellValue)?.label}</p>

            </div>
            <div className="flex-shrink-0">
              {/* Aquí iría el componente del icono, por ejemplo <WeatherIcon /> */}

              {user.weather ? weathers.find(w => w.key === user.weather)?.icon : ""}
            </div>

          </div>
        );
      case "mode":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={modeColorMap[user.mode]}
            size="sm"
            variant="dot"
          >
            {modes.find(u => u?.key === cellValue)?.label}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "date":
        return (
          <p>{cellValue instanceof Date ? cellValue.toLocaleDateString() : cellValue.toDate().toLocaleDateString()}</p>
        )
      case "time":
        return (
          <p>{secondsToTimeString(cellValue)}</p>
        )
      default:
        return cellValue
    }
  }, []);


  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full hidden lg:block sm:max-w-[44%]", // Oculta en pantallas pequeñas y muestra en pantallas grandes
              inputWrapper: "border-1",
            }}
            placeholder="Search by name or track..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">

            <Dropdown>
              <DropdownTrigger >
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <TimeModal />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {times.length}</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    props.modeFilter,
    props.trackFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    times.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        {/* <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span> */}
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <Table
      isCompact={true}
      removeWrapper
      aria-label="Time table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"

      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >

      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No times found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
