import { ReactNode } from "react";
import { Button } from "../Button/Button";
import { Popover } from "../Popover/Popover";
import arrowDown from "../../assets/icons/arrow-down.svg";
import "./sort-by.scss";

interface SortByProps {
  data: Array<{ id: number; label: string; [key: string]: any }>;
  selected: string;
  label: string;
  icon?: string | ReactNode;
  isClickClose?: boolean;
  onClick: (id: number, label: string) => void;
  placement?: "top" | "bottom" | "left" | "right" | "auto";
}

export const SortBy = ({
  data,
  selected,
  label,
  icon,
  isClickClose = true,
  onClick,
  placement = "bottom",
}: SortByProps) => {
  return (
    <Popover
      title={
        <Button
          label={label}
          variant="secondary"
          suffix={
            typeof icon === "string"
              ? (icon as never)
              : typeof arrowDown === "string"
              ? (arrowDown as never)
              : undefined
          }
        />
      }
      isClickClose={isClickClose}
      placement={placement}
      showArrow={false}
      offset={12}
      children={(closePopover) => (
        <Content
          data={data}
          onClick={(id, label) => {
            onClick(id, label);
            if (isClickClose) {
              closePopover();
            }
          }}
          selected={selected}
        />
      )}
    />
  );
};

type SortByDataItem = { id: number; label: string; [key: string]: any };

const Content = ({
  data,
  selected,
  onClick,
}: {
  data: SortByDataItem[];
  selected: string;
  onClick: (id: number, label: string) => void;
}) => {
  return (
    <div className="sort-by-dropdown">
      <ul className="sort-by-dropdown__list">
        {data?.map((item) => (
          <li
            className={`sort-by-dropdown__item ${
              item.label === selected ? "is-selected" : ""
            }`}
            key={item.id}
            onClick={() => onClick(item.id, item.label)}
            role="option"
            aria-selected={item.label === selected}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
