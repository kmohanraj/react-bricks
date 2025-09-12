import clsx from "classnames";
import { TPaginationProps } from "../../types/type";
import { Button } from "../Button/Button";
import './pagination.scss';

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  isPaginationLeft,
}: TPaginationProps) => (
  <div className={clsx("pagination", { left: isPaginationLeft })}>
    <Button
      label="Prev"
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      variant={currentPage === 1 ? "secondary" : "primary"}
      isDisabled={currentPage === 1}
    />
    <span style={{ padding: "10px" }}>
      Page {currentPage} of {totalPages}
    </span>
    <Button
      label="Next"
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      variant={currentPage === totalPages ? "secondary" : "primary"}
      isDisabled={currentPage === totalPages}
    />
  </div>
);

export default Pagination;