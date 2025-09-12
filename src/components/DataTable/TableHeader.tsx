import { Key } from "react";
import cx from "classnames";
import { TTableHeaderProps } from "../../types/type";

const TableHeader = <T,>({
  columns,
  isSorting,
  isAction,
  checkIsSorting,
}: TTableHeaderProps<T>) => (
  <thead>
    <tr>
      {columns.map((col) => (
        <th key={col.key as Key}>
          <div className={cx({ sorting: isSorting })}>
            <span>{col.label}</span>
            {isSorting && checkIsSorting(col.key)}
          </div>
        </th>
      ))}
      {isAction && <th>Action</th>}
    </tr>
  </thead>
);

export default TableHeader;
