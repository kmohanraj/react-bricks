import React, { FC, ChangeEvent } from "react";
import clsx from "classnames";
import CONSTANTS from "../../constants/constants";
import { TCheckBox } from "@/type/type";
import "./checkbox.scss";



export const CheckBox: FC<TCheckBox> = ({
  inputType,
  position,
  inputName,
  customClass = "",
  onChecked,
  isChecked,
  selected,
  value,
  testId,
  isDisabled,
}) => {
  const isValueSelected = isChecked ?? value === selected;

  const handleOnCheck = (e: any) => {
    const { KEY, KEYCODE } = CONSTANTS;
    if (e.key === KEY.ENTER || e.keyCode === KEYCODE.SPACE) {
      e.preventDefault();
      if (!isDisabled && value !== undefined) {
        onChecked?.(e, value);
      }
    }
  };

  const spanClass = clsx(inputType === "radio" ? "checkCircle" : "checkMark");

  return (
    <div className="checkbox">
      <label
        role="switch"
        aria-label={inputName}
        aria-checked={isValueSelected}
        aria-disabled={isDisabled}
        className={clsx(
          "checkbox__wrapper",
          customClass,
          {
            checked: isValueSelected,
            left:  position === "left"
          }
        )}
      >
        <input
          id={value}
          type={inputType}
          name={inputName}
          value={value}
          checked={value === selected || isChecked}
          className={inputType === "radio" ? "radio" : "peer sr-only"}
          onChange={handleOnCheck}
          data-testid={testId}
          disabled={isDisabled}
          role="switch"
          aria-label={inputName}
          aria-checked={isValueSelected}
          tabIndex={0}
        />
        <span
          className={spanClass}
          aria-hidden="true"
        />
        <span>Test</span>
      </label>
    </div>
  );
};
