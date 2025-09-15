import clsx from "classnames";
import { TPaginationProps } from "../../types/type";
import { Button } from "../Button/Button";
import { Image } from "../Image/Image";
import * as Icons from "../../assets/icons/icon";

import './pagination.scss';

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  paginationPlacement,
}: TPaginationProps) => (
  <div className={clsx("pagination", paginationPlacement)}>
    {/* <Button
      label="Prev"
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      variant={currentPage === 1 ? "secondary" : "primary"}
      isDisabled={currentPage === 1}
    /> */}
    <Image
      src={Icons.previousIcon as unknown as string}
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      width="18"
      height="18"
    />
    <span className="pagination-page-count">
      Page {currentPage} of {totalPages}
    </span>
     <Image
      src={Icons.nextIcon as unknown as string}
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      width="18"
      height="18"
    />
    {/* <Button
      label="Next"
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      variant={currentPage === totalPages ? "secondary" : "primary"}
      isDisabled={currentPage === totalPages}
    /> */}
  </div>
);

export default Pagination;