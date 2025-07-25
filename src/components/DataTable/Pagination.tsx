import React from "react";
import clsx from "classnames";
import { TPaginationProps } from "@/type/type";
import { Button } from "../Button/Button";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  isPaginationRight,
}: TPaginationProps) => (
  <div className={clsx("pagination", { right: isPaginationRight })}>
    <Button
      label="Prev"
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      isDisabled={currentPage === 1}
    />
    <span style={{ padding: "10px" }}>
      Page {currentPage} of {totalPages}
    </span>
    <Button
      label="Next"
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      isDisabled={currentPage === totalPages}
    />
  </div>
);

export default Pagination;