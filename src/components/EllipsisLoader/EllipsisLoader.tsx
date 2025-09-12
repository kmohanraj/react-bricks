import { FC } from "react";
import clsx from "classnames";
import { TEllipsisLoader } from "../../types/type";
import "./ellipsis-loader.scss";


export const EllipsisLoader: FC<TEllipsisLoader> = ({
  color = "",
  size = "sm",
}) => {
  const loaderClass = clsx(
    "ldsEllipsis",
    color ? color : null,
    size ? size : null
  );
  return (
    <span className={loaderClass}>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
};
