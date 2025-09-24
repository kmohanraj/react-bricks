import { Key } from "react";
import { TTableActions, TTableBodyProps } from "../../types/type";
import { Image } from "../Image/Image";
import { Popover } from "../Popover/Popover";
import * as Icons from "../../assets/icons/icon";

const Actions = <T extends Record<string, any>>({
  onAction,
  onEdit,
  onDelete,
  row,
  iconSize,
}: TTableActions<T>) => {
  return (
    <div className="actions-items">
      {onAction && (
        <Image
          src={Icons.addWallet as unknown as string}
          width={iconSize}
          height={iconSize}
          onClick={() => onAction?.(row)}
        />
      )}
      {onEdit && (
        <Image
          src={Icons.edit as unknown as string}
          width={iconSize}
          height={iconSize}
          onClick={() => onEdit?.(row)}
        />
      )}
      {onDelete && (
        <Image
          src={Icons.deleteIcon as unknown as string}
          width={iconSize}
          height={iconSize}
          onClick={() => onDelete?.(row)}
        />
      )}
    </div>
  );
};

const TableBody = <T extends Record<string, any>>({
  paginatedData,
  columns,
  isAction,
  isMoreBtn,
  onAction,
  onEdit,
  onDelete,
  iconSize,
}: TTableBodyProps<T>) => {
  const hasIdColumn = columns.some((col) => col.key === "id");
  const visibleColumns = columns.filter((col) => col.key !== "id");

  return (
    <tbody>
      {paginatedData.map((row, idx) => (
        <tr key={idx}>
          {hasIdColumn && <td>{idx + 1}</td>}
          {visibleColumns.map((col) => (
            <td className="" key={col.key as Key}>
              {row[col.key]}
            </td>
          ))}
          {isAction && (
            <td className="actions">
              {isMoreBtn ? (
                <Popover
                  children={
                    <Image
                      src={Icons.moreIcon3 as unknown as string}
                      width="28"
                      height="28"
                    />
                  }
                  content={
                    <Actions
                      onAction={onAction}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      row={row}
                      iconSize={iconSize}
                    />
                  }
                />
              ) : (
                <>
                  <Actions
                    onAction={onAction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    row={row}
                    iconSize={iconSize}
                  />
                </>
              )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
