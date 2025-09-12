import { Key } from "react";
import { TTableBodyProps } from "../../types/type";
import { Image } from "../Image/Image";
import * as Icons from "../../assets/icons/icon";

const TableBody = <T extends Record<string, any>>({
  paginatedData,
  columns,
  isAction,
  onAction,
  onEdit,
  onDelete,
}: TTableBodyProps<T>) => (
  <tbody>
    {paginatedData.map((row, idx) => (
      <tr key={idx}>
        {columns.map((col) => (
          <td className="" key={col.key as Key}>
            {row[col.key]}
          </td>
        ))}
        {isAction && (
          <td className="actions">
            {onAction && (
              <span onClick={() => onAction?.(row)}>
                <Image
                  src={Icons.addWallet as unknown as string}
                  width="14"
                  height="14"
                />
              </span>
            )}
            {onEdit && (
              <span onClick={() => onEdit?.(row)}>
                <Image
                  src={Icons.edit as unknown as string}
                  width="14"
                  height="14"
                />
              </span>
            )}
            {onDelete && (
              <span onClick={() => onDelete?.(row)}>
                <Image
                  src={Icons.deleteIcon as unknown as string}
                  width="14"
                  height="14"
                />
              </span>
            )}
          </td>
        )}
      </tr>
    ))}
  </tbody>
);

export default TableBody;
