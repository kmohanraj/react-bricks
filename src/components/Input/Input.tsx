import { ChangeEvent, FC, useState } from "react";
import cx from "classnames";
import { TInputField } from "../../types/type";
import "./input.scss";

const getErrorClass = (error: boolean) => cx("message", { error });
const getLabelClass = (
  inputValue: string | number,
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
  cx("input-field", customClass, variant, borderType ? borderType : null, {
    error,
    "has-prefix": preFixIcon,
    "has-suffix": sufFixIcon,
  });

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
  name,
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
  variant = "ghost",
  isNumber,
  isDecimal,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [inputValue, setInputValue] = useState<string | number>(value ?? "");
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    isNumber: boolean | undefined,
    setInputValue: (value: string | number) => void
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number | null = value;
    const parseNumber = value.replace(/[^0-9.]/g, "");
    if (isNumber) {
      parsedValue = parseInt(parseNumber);
      // setInputValue(parsedValue);
      // onChange?.(name, Number(value), e);
    } else if (isDecimal) {
      parsedValue = parseFloat(parseNumber);
      // onChange?.(name, parseFloat(value), e);
    } else {
      // setInputValue(value);
      parsedValue = value;
    }
    setInputValue(parsedValue);
    onChange?.(name, parsedValue, e);
  };

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
          name={name}
          id={inputId}
          value={inputValue}
          required={isRequired}
          aria-required={isRequired}
          onChange={(e) => handleInputChange(e, isNumber, setInputValue)}
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
