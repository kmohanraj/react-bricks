import { Key } from "react";
import { TTableActions, TTableBodyProps } from "../../types/type";
import { Image } from "../Image/Image";
import * as Icons from "../../assets/icons/icon";
import { Popover } from "../Popover/Popover";

const Actions = <T extends Record<string, any>>({
  onAction,
  onEdit,
  onDelete,
  row,
}: TTableActions<T>) => {
  return (
    <div className="actions-items">
      {onAction && (
        // <span onClick={() => onAction?.(row)}>
        <Image
          src={Icons.addWallet as unknown as string}
          width="18"
          height="18"
          onClick={() => onAction?.(row)}
        />
        // </span>
      )}
      {onEdit && (
        // <span >
        <Image
          src={Icons.edit as unknown as string}
          width="18"
          height="18"
          onClick={() => onEdit?.(row)}
        />
        // </span>
      )}
      {onDelete && (
        // <span >
        <Image
          src={Icons.deleteIcon as unknown as string}
          width="18"
          height="18"
          onClick={() => onDelete?.(row)}
        />
        // </span>
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
                />
                {/* {onAction && (
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
                )} */}
              </>
            )}
          </td>
        )}
      </tr>
    ))}
  </tbody>
);

export default TableBody;
