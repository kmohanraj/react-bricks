import { FC } from "react";
import cx from "classnames";
import "./badge.scss";

type TBadge = {
  title: string;
  onClick?: (title?: string) => void;
  variant: "primary" |"info" | "active" | "success" | "warning" | "error" | "ghost" | "overdue" | "late";
  isRound?: boolean;
  customClass?: string;
};
export const Badge: FC<TBadge> = ({
  title,
  onClick,
  isRound,
  customClass,
  variant,
}) => {
  return (
    <div
      className={cx(
        "badge",
        customClass,
        variant,
        { link: !!onClick },
        { "is-round": isRound }
      )}
      onClick={() => onClick?.(title)}
    >
      {title}
    </div>
  );
};
