import { ChangeEvent, FC, useEffect, useRef, useState, KeyboardEvent } from "react";
import cx from "classnames";
import { TOption, TSelect } from "../../type/type";
import * as Icons from "../../assets/icons/icon";
import { EllipsisLoader } from "../EllipsisLoader/EllipsisLoader";
import "./select.scss";

export const Select: FC<TSelect> = ({
  value = '',
  inputId,
  placeholder,
  isRequired = false,
  options,
  onSelect,
  isMulti,
  isSearchable,
  isDisabled,
  isLoading,
  isClearable,
  onClear,
}) => {
  const initialState = isMulti ? ([] as any) : {};
  const [searchValue, setSearchValue] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const removeRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState(initialState);

  const selectClass = cx(
    "select_control",
    { "is-focused": isMenuOpen },
    { "is-disabled": isDisabled }
  );
  const selectValueClass = cx(
    "select__values",
    { "is-multi": isMulti },
    { "is-single": !isMulti }
  );
  const hasValueClass = cx(
    {
      "is-focus":
        isMenuOpen &&
        searchValue.length === 0 &&
        Object.keys(selectedValue).length === 0,
    },
    {
      "has-value":
        (isMulti && selectedValue.length > 0) ||
        Object.keys(selectedValue).length > 0 ||
        isMenuOpen,
    }
  );
  const suffixIConClass = cx("suffix-icon", { "is-open": isMenuOpen });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e?.target.value);
    setIsMenuOpen(true);
  };

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
      const handler = (e: MouseEvent) => {
          if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
              setIsMenuOpen(false);
              setSearchValue("");
          }
      };
      window.addEventListener("click", handler);
      return () => {
          window.removeEventListener("click", handler);
      };
  }, []);

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.keyCode;
    const checkKeyCode = searchValue.length < 1 && keyCode === 8 && !isMulti;
    if (checkKeyCode) {
      if (Object.keys(selectedValue).length > 0) {
        setSelectedValue(initialState);
        onClear?.(inputId);
      }
      setSearchValue("");
    }
  };

  const removeOption = (option: TOption) => {
    return selectedValue.filter((opt: TOption) => opt.label !== option.label);
  };

  const handleOnRemoveItem = (option: TOption) => {
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onSelect(newValue);
  };

  const handleOnSelect = (option: TOption) => {
    let newValue;

    if (isMulti) {
      if (
        selectedValue.findIndex((opt: TOption) => opt.label === option.label) >= 0
      ) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onSelect(newValue);
  };

  const filterOptions = () => {
    if (!searchValue) {
      return options;
    }
    return (
      options &&
      options.filter(
        (option) =>
          option.label.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >=
          0
      )
    );
  };

  const handleOnSelectBox = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (isDisabled) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const checkSelectionOption = () => {
    return (
      <>
        {!searchValue && isMulti ? (
          selectedValue &&
          selectedValue?.map((opt: TOption) => (
            <div key={opt.id} className="select__multi__value">
              <div className="select__multi__value__label">{opt.label}</div>
              <div
                className="select__multi__value__remove"
                ref={removeRef}
                onClick={() => !isDisabled && handleOnRemoveItem(opt)}
              >
                x
              </div>
            </div>
          ))
        ) : (
          <span className="select__value">{selectedValue.label}</span>
        )}
      </>
    );
  };

  const checkSelectedItem = (option: TOption, index: number) => {
    const multipleOptions =
      isMulti && selectedValue && !selectedValue.includes(option);
    const checkIsMulti = isMulti ? multipleOptions : true;
    if (checkIsMulti) {
      return (
        <div
          key={index}
          className={`select__option ${
            !isMulti && selectedValue.id === option.id ? "is-selected" : ""
          }`}
          onClick={() => handleOnSelect(option)}
        >
          {multipleOptions ? option.label : option.label}
        </div>
      );
    }
  };

  return (
    <div className="select">
      <div className={selectClass} ref={selectRef} onClick={handleOnSelectBox}>
        <div className="select_value_container">
          <div className={selectValueClass}>
            {checkSelectionOption()}
            <input
              autoCapitalize="none"
              autoComplete="off"
              id={inputId}
              type="text"
              aria-autocomplete="list"
              value={searchValue}
              className="select_input__field"
              onChange={handleOnChange}
              onKeyUp={handleOnKeyDown}
              readOnly={isSearchable}
              disabled={isDisabled}
              ref={inputRef}
            />
          </div>
          <label className={hasValueClass}>
            {placeholder} {isRequired && "*"}
          </label>

          <div className="right-section">
            {isLoading && (
              <span className="loader">
                <EllipsisLoader size="sm" />
              </span>
            )}
            {isClearable &&
              (selectedValue.length > 0 ||
                Object.keys(selectedValue).length > 0) && (
                <img
                  src={Icons.close as unknown as string}
                  alt=""
                  className="clear-all"
                  onClick={() =>
                    !isDisabled && setSelectedValue(isMulti ? [] : {})
                  }
                />
              )}
            <img
              className={suffixIConClass}
              src={Icons.arrowDown as unknown as string}
              alt=""
              role="presentation"
            />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="select__menu">
          <div className="select__menu-list">
            {selectedValue?.length === filterOptions().length ? (
              <div className="no-options">No Options</div>
            ) : (
              filterOptions()?.map((option: TOption, index: number) =>
                checkSelectedItem(option, index)
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
