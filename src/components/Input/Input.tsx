import { ChangeEvent, useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import cx from "classnames";
import { TInputField } from "../../types/type";
import RenderCalendar from "./Calender";
import "./input.scss";
import { formatPrice } from "../../helper/helper";

const getErrorClass = (error: boolean) => cx("message", { error });
const getLabelClass = (
  value: string | number,
  error: boolean,
  preFixIcon?: string,
  showLabel?: boolean,
) => {
  const cls = cx({
    "has-value": value,
    error,
    "has-prefix": preFixIcon,
    "hide-label": !showLabel,
  });
  return cls || undefined
}

const getInputClass = (
  customClass: string | undefined,
  variant: string | undefined,
  borderType: string,
  error: boolean,
  preFixIcon?: string,
  sufFixIcon?: string,
  hideFloating?: boolean,
) => {
  const cls = cx("input-field", customClass, variant, borderType ? borderType : null, {
    error,
    "has-prefix": preFixIcon,
    "has-suffix": sufFixIcon,
    "floating": !hideFloating,
  });
  return cls || undefined
}
  

const handleInputFocus = (
  setIsDateShow: (show: boolean) => void,
  setIsFocused: (focused: boolean) => void,
) => {
  setIsDateShow(true);
  setIsFocused(true);
};

export const Input = <T,>({
  name,
  value,
  onChange,
  message,
  error,
  placeholder,
  inputId = "input",
  borderType = "outlined",
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
  isCommaSeparate,
  isDecimal,
  timeZone,
  isDatePicker,
  isShowPastDate,
  isTextArea,
  hideFloating = false,
  rows,
}: TInputField) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const calendarRef = useRef<HTMLInputElement>(null);
  const errorClass = getErrorClass(!!error);

  const inputClass = getInputClass(
    customClass,
    variant,
    borderType,
    !!error,
    preFixIcon,
    sufFixIcon,
    hideFloating,
  );
  // Date setter
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [isDateShow, setIsDateShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const hasValue =
    value !== null && value !== undefined && String(value).length > 0;
  const showLabel = hideFloating
    ? !hideFloating || (!isFocused && !hasValue)
    : true;
  const labelClass = getLabelClass(
    value as string,
    !!error,
    preFixIcon,
    showLabel,
  );
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let inputValue = e.target.value;
    if (isNumber) {
      const num = isCommaSeparate
        ? parseInt(inputValue.replace(/,/g, ""), 10)
        : parseInt(e.target.value, 10);
      inputValue = isNaN(num) ? "" : num.toString();
    } else if (isDecimal) {
      inputValue = e.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
    }
    onChange?.(inputValue);
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(selectedDate);
    onChange?.(selectedDate);
    setIsDateShow(false);
  };

  const handleOnBlur = (e: any) => {
    onBlur?.();
    setIsFocused(value ? true : false);
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

  let effectiveSelectedDate: Date | null = null;
  if (selectedDate) {
    effectiveSelectedDate = selectedDate;
  } else if (value) {
    // Try to parse value as date
    const m = moment(value, "DD/MM/YYYY", true);
    effectiveSelectedDate = m.isValid() ? m.toDate() : null;
  }

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
        {isTextArea ? (
          <textarea
            ref={textAreaRef}
            name={name}
            id={inputId}
            value={value ?? ""}
            required={isRequired}
            aria-required={isRequired}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            onFocus={() => handleInputFocus(setIsDateShow, setIsFocused)}
            autoComplete={autoComplete}
            disabled={isDisabled}
            maxLength={maxLength}
            rows={rows ?? 4}
          />
        ) : (
          <input
            ref={inputRef}
            name={name}
            id={inputId}
            type={inputType}
            value={isCommaSeparate ? formatPrice(Number(value)) : (value ?? "")}
            required={isRequired}
            aria-required={isRequired}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            onFocus={() => handleInputFocus(setIsDateShow, setIsFocused)}
            autoComplete={autoComplete}
            disabled={isDisabled}
            maxLength={maxLength}
            readOnly={isDatePicker}
          />
        )}
        <label className={labelClass} htmlFor={inputId}>
          {placeholder}
          {isRequired && "*"}
        </label>
      </span>
      {isDatePicker && isDateShow && (
        <div ref={calendarRef}>
          <RenderCalendar
            today={today}
            timeZone={timeZone ?? ""}
            isShowPastDate={isShowPastDate}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            selectedDate={effectiveSelectedDate}
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
