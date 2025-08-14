import { FC } from "react";
import clsx from "classnames";
import CONSTANTS from "../../constants/constants";
import { TCheckBox } from "../../type/type";
import "./checkbox.scss";

const isValueSelectedFn = (isChecked: boolean | undefined, value: any, selected: any) => {
  return isChecked ?? value === selected;
}

const handleOnCheckFn = (
  e: React.ChangeEvent<HTMLInputElement>,
  isDisabled: boolean | undefined,
  value: any,
  onChecked: ((e: React.ChangeEvent<HTMLInputElement>, value: any) => void) | undefined
) => {
  if (!isDisabled && value !== undefined) {
    onChecked?.(e, value);
  }
}

const handleOnKeyDownFn = (
  e: any,
  isDisabled: boolean | undefined,
  value: any,
  onChecked: ((e: React.ChangeEvent<HTMLInputElement>, value: any) => void) | undefined
) => {
  const { KEY, KEYCODE } = CONSTANTS;
  if (e.key === KEY.ENTER || e.keyCode === KEYCODE.SPACE) {
    e.preventDefault();
    if (!isDisabled && value !== undefined) {
      onChecked?.(e, value);
    }
  }
}

export const CheckBox: FC<TCheckBox> = ({
  label,
  testId,
  type,
  position,
  name,
  customClass = "",
  onChecked,
  isChecked,
  selected,
  value,
  isDisabled,
}) => {
  const isValueSelected = isValueSelectedFn(isChecked, value, selected);

  const handleOnCheck = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleOnCheckFn(e, isDisabled, value, onChecked);

  const handleOnKeyDown = (e: any) =>
    handleOnKeyDownFn(e, isDisabled, value, onChecked);

  const spanClass = clsx(type === "radio" ? "checkCircle" : "checkMark");

  return (
    <div className="checkbox">
      <label
        role="switch"
        aria-label={name}
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
          onChange={handleOnCheck}
          onKeyDown={handleOnKeyDown}
          data-testid={testId}
          disabled={isDisabled}
          role="switch"
          aria-label={name}
          aria-checked={isValueSelected}
          tabIndex={0}
          name={name}
        />
        <span
          onChange={handleOnCheck}
          onKeyDown={handleOnKeyDown}
          className={spanClass}
          aria-hidden="true"
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
