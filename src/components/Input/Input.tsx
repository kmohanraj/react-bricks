import { ChangeEvent, FC, useState } from "react";
import cx from "classnames";
import { TInputField } from "../../types/type";
import "./input.scss";

const getErrorClass = (error: boolean) => cx("message", { error });
const getLabelClass = (
  inputValue: string,
  error: boolean,
  preFixIcon?: string
) =>
  cx({
    "has-value": inputValue,
    error,
    "has-prefix": preFixIcon,
  });
const getInputClass = (
  customClass: string | undefined,
  variant: string | undefined,
  borderType: string,
  error: boolean,
  preFixIcon?: string,
  sufFixIcon?: string
) =>
  cx('input-field', customClass, variant, borderType ? borderType : null, {
    error,
    "has-prefix": preFixIcon,
    "has-suffix": sufFixIcon,
  });

const handleInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  isNumber: boolean | undefined,
  setInputValue: (value: string) => void,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
) => {
  const value = e.target.value;
  if (isNumber) {
    const val = value.replace(/[^0-9.]/g, '')
    setInputValue(val);
    onChange?.({...e, target: {...e.target, value: val}});
  } else {
    setInputValue(value);
    onChange?.(e);
  }
};

const handleInputBlur = (
  onBlur: (() => void) | undefined,
  setIsShow: (show: boolean) => void
) => {
  onBlur?.();
  setIsShow(false);
};

const handleInputFocus = (
  setIsShow: (show: boolean) => void,
  isShow: boolean
) => {
  setIsShow(!isShow);
};

export const Input: FC<TInputField> = ({
  value,
  onChange,
  message,
  error,
  placeholder,
  inputId = "input",
  borderType = "",
  isRequired,
  customClass,
  preFixIcon,
  sufFixIcon,
  suffixOnClick,
  altName,
  inputType,
  onBlur,
  isDisabled,
  maxLength,
  autoComplete = "off",
  variant = 'ghost',
  isNumber,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const errorClass = getErrorClass(!!error);
  const labelClass = getLabelClass(inputValue, !!error, preFixIcon);
  const inputClass = getInputClass(
    customClass,
    variant,
    borderType,
    !!error,
    preFixIcon,
    sufFixIcon
  );

  return (
    <span className={inputClass}>
      <span className="input-field__input-wrapper">
        {preFixIcon && (
          <img
            className="prefix-icon"
            src={preFixIcon}
            alt={altName}
            role="presentation"
          />
        )}
        {sufFixIcon && (
          <img
            className="suffix-icon"
            src={sufFixIcon}
            alt={altName}
            role="presentation"
            onClick={suffixOnClick}
          />
        )}
        <input
          name={inputId}
          id={inputId}
          value={inputValue}
          required={isRequired}
          aria-required={isRequired}
          onChange={(e) =>
            handleInputChange(e, isNumber, setInputValue, onChange)
          }
          onBlur={() => handleInputBlur(onBlur, setIsShow)}
          onFocus={() => handleInputFocus(setIsShow, isShow)}
          autoComplete={autoComplete}
          type={inputType}
          disabled={isDisabled}
          maxLength={maxLength}
        />
        <label className={labelClass} htmlFor={inputId}>
          {placeholder}
          {isRequired && "*"}
        </label>
      </span>
      {message && <span className="message">{message}</span>}
      {error && <span className={errorClass}>{error}</span>}
    </span>
  );
};
