import { ReactNode } from "react";
import cx from "classnames";
import { Button } from "../Button/Button";
import { Popover } from "../Popover/Popover";
import arrowDown from "../../assets/icons/arrow-down.svg";
import "./sort-by.scss";

export const SortBy = ({
  data,
  selected,
  isHideArrow,
  isBorderRadius,
  customClass,
  label,
  icon,
  isClickClose,
  onClick,
}: {
  data: [];
  selected: string;
  isHideArrow?: boolean;
  isBorderRadius?: boolean;
  customClass: string;
  label: string;
  variant: "primary" | "secondary" | "ghost";
  icon: string | ReactNode;
  isClickClose: boolean;
  children: ReactNode;
  onClick: (id: number, label: string) => {};
}) => {
  return (
    <Popover
      customClass={cx("sort-by", customClass, {
        "hide-arrow": isHideArrow,
        "is-border-radius": isBorderRadius,
      })}
      children={
        <Button
          label={label}
          variant="secondary"
          suffix={
            typeof icon === "string"
              ? icon
              : typeof arrowDown === "string"
              ? arrowDown
              : undefined
          }
        />
      }
      isClickClose={isClickClose}
      content={<Content data={data} onClick={onClick} selected={selected} />}
    />
  );
};

type SortByDataItem = { label: string; [key: string]: any };

const Content = ({
  data,
  selected,
  onClick,
}: {
  data: SortByDataItem[];
  selected: string;
  onClick: (id: number, label: string) => {};
}) => {
  return (
    <div className="">
      {data?.map((item, idx) => (
        <li
          className={cx("list", { selected: item.label === selected })}
          key={idx}
          onClick={() => onClick(item.id, item.label)}
        >
          {item.label}
        </li>
      ))}
    </div>
  );
};
