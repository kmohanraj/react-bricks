import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import cx from "classnames";
import { TInputField } from "../../types/type";
import RenderCalendar from "./Calender";
import "./input.scss";

const getErrorClass = (error: boolean) => cx("message", { error });
const getLabelClass = (
  value: string | number,
  error: boolean,
  preFixIcon?: string
) =>
  cx({
    "has-value": value,
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
  setIsDateShow: (show: boolean) => void,
  isShow: boolean
) => {
  setIsShow(!isShow);
  setIsDateShow(true);
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
  isDatePicker,
}) => {
  const [isShow, setIsShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLInputElement>(null);
  // const [inputValue, setInputValue] = useState<string | number>(value ?? "");
  const errorClass = getErrorClass(!!error);
  const labelClass = getLabelClass(value as string, !!error, preFixIcon);
  const inputClass = getInputClass(
    customClass,
    variant,
    borderType,
    !!error,
    preFixIcon,
    sufFixIcon
  );
  // Date setter
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [isDateShow, setIsDateShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // If you want to handle number/decimal parsing, do it here using props
    // Example:
    let parsedValue: string | number = e.target.value;
    if (isNumber) {
      const num = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
      parsedValue = isNaN(num) ? "" : num;
    } else if (isDecimal) {
      const floatNum = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
      parsedValue = isNaN(floatNum) ? "" : floatNum;
    }
    onChange?.(parsedValue);
    // onChange?.(e.target.value);
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(selectedDate);
    // const formattedDate = formatDate(selectedDate);
    // setInputValue(formattedDate);
    onChange?.(selectedDate);
    setIsDateShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const calendarExists = calendarRef.current !== null;
      const inputExists = inputRef.current !== null;

      const clickedOutsideCalendar =
        calendarExists && !calendarRef.current!.contains(event.target as Node);
      const clickedOutsideInput =
        inputExists && !inputRef.current!.contains(event.target as Node);

      // Close datepicker only if clicked outside both calendar and input
      if (clickedOutsideCalendar && clickedOutsideInput) {
        setIsDateShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          ref={inputRef}
          name={name}
          id={inputId}
          type={inputType}
          value={value ?? ""}
          required={isRequired}
          aria-required={isRequired}
          onChange={handleInputChange}
          onBlur={() => handleInputBlur(onBlur, setIsShow)}
          onFocus={() => handleInputFocus(setIsShow, setIsDateShow, isShow)}
          autoComplete={autoComplete}
          disabled={isDisabled}
          maxLength={maxLength}
          readOnly={isDatePicker}
        />
        <label className={labelClass} htmlFor={inputId}>
          {placeholder}
          {isRequired && "*"}
        </label>
      </span>
      {isDatePicker && isDateShow && (
        <div ref={calendarRef}>
          <RenderCalendar
            today={today}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            selectedDate={selectedDate}
            handleDateSelect={handleDateSelect}
            setIsDateShow={setIsDateShow}
          />
        </div>
      )}
      {message && <span className="message">{message}</span>}
      {error && <span className={errorClass}>{error}</span>}
    </span>
  );
};
