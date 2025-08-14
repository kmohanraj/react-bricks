import { Key } from "react";
import { TTableBodyProps } from "../../type/type";
import { Image } from "../Image/Image";
import * as Icons from "../../assets/icons/icon";

const TableBody = <T extends Record<string, any>>({
  paginatedData,
  columns,
  isAction,
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
            <span onClick={() => {}}>
              <Image
                src={Icons.addWallet as unknown as string}
                width="14"
                height="14"
              />
            </span>
            <span onClick={() => {}}>
              <Image
                src={Icons.edit as unknown as string}
                width="14"
                height="14"
              />
            </span>
            <span onClick={() => {}}>
              <Image
                src={Icons.deleteIcon as unknown as string}
                width="14"
                height="14"
              />
            </span>
          </td>
        )}
      </tr>
    ))}
  </tbody>
);

export default TableBody;