import { FC } from "react";
import cx from "classnames";
import CONSTANTS from "../../constants/constants";
import { TCheckBox } from "../../types/type";
import "./checkbox.scss";

const handleOnCheckFn = (
  e: React.ChangeEvent<HTMLInputElement>,
  isDisabled: boolean | undefined,
  onChecked: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
) => {
  if (!isDisabled) {
    onChecked?.(e);
  }
};

const handleOnKeyDownFn = (
  e: any,
  isDisabled: boolean | undefined,
  value: string | undefined,
  onChecked: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
) => {
  const { KEY, KEYCODE } = CONSTANTS;
  if (e.key === KEY.ENTER || e.keyCode === KEYCODE.SPACE) {
    e.preventDefault();
    if (!isDisabled) {
      onChecked?.(e);
    }
  }
};

export const CheckBox: FC<TCheckBox> = ({
  label,
  testId,
  type,
  position,
  name,
  customClass = "",
  onChecked,
  isChecked,
  value,
  isDisabled,
  variant
}) => {

  const handleOnCheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleOnCheckFn(
      e,
      isDisabled,
      onChecked
    );
  };

  const handleOnKeyDown = (e: any) =>
    handleOnKeyDownFn(e, isDisabled, value, onChecked);

  const spanClass = cx({
    checkCircle: type === "radio",
    checkMark: type === "checkbox",
    switchSlider: type === "switch",
  });

  return (
    <div className={cx("checkbox", customClass, variant)}>
      <label
        role={type}
        aria-label={name}
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        className={cx("checkbox__wrapper", {
          checked: isChecked,
          left: position === "left",
        })}
      >
        <input
          onChange={handleOnCheck}
          onKeyDown={handleOnKeyDown}
          data-testid={testId}
          disabled={isDisabled}
          role={type}
          aria-label={name}
          aria-checked={isChecked}
          checked={isChecked}
          tabIndex={0}
          name={name}
          type={type === "switch" ? "checkbox" : type}
        />
        <span
          className={spanClass}
          aria-hidden="true"
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
