import React, { FC, useState } from "react";
import cx from "classnames";
import { TInputField } from "../../type/type";
import "./input.scss";

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
}) => {
  const [isShow, setIsShow] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const errorClass = cx("message", { error: error });
  const labelClass = cx({
    "has-value": inputValue,
    error: error,
    "has-prefix": preFixIcon,
  });
  const inputClass = cx(customClass, borderType ? borderType : null, {
    error: error,
    "has-prefix": preFixIcon,
    "has-suffix": sufFixIcon,
  });

  const handleOnBlur = () => {
    onBlur?.();
    setIsShow(false);
  };

  const handleOnFocus = () => {
    setIsShow(!isShow);
  };

  return (
    <span className="input-field">
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
          className={inputClass}
          id={inputId}
          value={inputValue}
          required={isRequired}
          aria-required={isRequired}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange?.(e);
          }}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
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
