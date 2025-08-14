import React, { useState } from "react";
import { TDataTable} from "../../type/type";
import { Image } from "../Image/Image";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import * as Icons from "../../assets/icons/icon";
import "./data-table.scss";

const getSortedData = <T,>(
  data: T[],
  sortConfig: { key: keyof T | null; direction: "asc" | "desc" }
): T[] => {
  if (!sortConfig.key) return data;
  return [...data].sort((a, b) => {
    const aVal = a[sortConfig.key as keyof T];
    const bVal = b[sortConfig.key as keyof T];
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
};

const getPaginatedData = <T,>(
  data: T[],
  currentPage: number,
  rowsPerPage: number
): T[] =>
  data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

export const DataTable = <T extends Record<string, any>>({
  data,
  columns = [],
  rowsPerPage = 5,
  isSorting = false,
  isPagination = false,
  isAction = false,
  isPaginationRight = false,
  sortingAscIcon = Icons.sortingAsc,
  sortingDesIcon = Icons.sortingDes
}: TDataTable<T & { [K in keyof T]: T[K] }>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = React.useMemo(
    () => getSortedData(data, sortConfig),
    [data, sortConfig]
  );

  const paginatedData = React.useMemo(
    () => getPaginatedData(sortedData, currentPage, rowsPerPage),
    [sortedData, currentPage, rowsPerPage]
  );

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const requestSort = (key: keyof T | null) => {
    let direction: "asc" | "desc" = "asc";
    const shouldToggleDesc =
      sortConfig.key === key && sortConfig.direction === "asc";
    if (shouldToggleDesc) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const checkIsSorting = (key: keyof T) => {
    const isAsc = sortConfig.key === key && sortConfig.direction === "asc";
    const iconSrc = isAsc ? sortingAscIcon : sortingDesIcon;
    const altText = isAsc ? "Sort descending" : "Sort ascending";
    return (
      <Image
        src={iconSrc as unknown as string}
        alt={altText}
        width="16"
        height="16"
        className="sort-icon"
        onClick={() => requestSort(key)}
      />
    );
  };

  return (
    <div className="table-wrapper">
      <table className="table" border={1} cellPadding={10} cellSpacing={0}>
        <TableHeader
          columns={columns}
          isSorting={isSorting}
          isAction={isAction}
          checkIsSorting={checkIsSorting}
        />
        <TableBody
          paginatedData={paginatedData}
          columns={columns}
          isAction={isAction}
        />
      </table>
      {isPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          isPaginationRight={isPaginationRight}
        />
      )}
    </div>
  );
};
