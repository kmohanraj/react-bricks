import {
  ChangeEvent,
  Dispatch,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  SyntheticEvent,
  SetStateAction,
} from "react";

export type TButton = {
  id?: string;
  title?: string;
  link?: string;
  type?: string;
  label?: string;
  variant?: "primary" | "secondary";
  loaderSize?: "sm" | "md" | "lg";
  loaderColor?:
    | "primary"
    | "dark"
    | "grey"
    | "white"
    | "success"
    | "warning"
    | string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  customClass?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  role?: string;
  ariaLabelledBy?: string;
  ariaDescription?: string;
};

export type TCheckBox = {
  inputType: "checkbox" | "radio";
  position: "left" | "right";
  customClass?: string;
  inputName?: string;
  label?: string;
  onChecked?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  isChecked?: boolean;
  selected?: string;
  value?: string;
  testId?: string;
  isDisabled?: boolean;
};

export type TEllipsisLoader = {
  color?:
    | "primary"
    | "dark"
    | "grey"
    | "white"
    | "success"
    | "warning"
    | string;
  size?: "sm" | "md" | "lg";
};

export type TInputField = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  message?: string;
  error?: string;
  placeholder: string;
  inputId: string;
  borderType: "outlined" | "underlined";
  isRequired?: boolean;
  customClass?: string;
  preFixIcon?: any;
  sufFixIcon?: any;
  suffixOnClick?: any;
  altName?: string;
  inputType?: string;
  isSelect?: boolean;
  selectOptions?: any;
  onSelect?: any;
  onBlur?: () => void;
  isDisabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
};

export type TModal = {
  id: string;
  closeIcon: string;
  isShowModal: boolean;
  customClass: string;
  children: ReactNode;
  onModalClose: any;
  closeAriaLabel: string;
  modalAriaLabel: string;
};

export type TOption = {
  id: any;
  label: string;
};

export type TSelect = {
  value: any;
  inputId?: string;
  placeholder: string;
  options: any[];
  onSelect: (option: TOption) => void;
  isRequired?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  onClear?: (field: any) => void;
};

export type TColumn<T> = {
  key: keyof T;
  label: string;
};

export type TDataTable<T> = {
  data: T[];
  columns: TColumn<T>[];
  rowsPerPage?: number;
  isSorting?: boolean;
  isPagination?: boolean;
  isAction?: boolean;
  isPaginationRight?: boolean;
};

export type TTableHeaderProps<T> = {
  columns: { key: keyof T; label: string }[];
  isSorting: boolean;
  isAction: boolean;
  checkIsSorting: (key: keyof T) => ReactNode;
};

export type TTableBodyProps<T> = {
  paginatedData: T[];
  columns: { key: keyof T; label: string }[];
  isAction: boolean;
};

export type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isPaginationRight: boolean;
};

export type TImage = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
  onError?: (e: SyntheticEvent<HTMLImageElement, Event>, src: string) => void;
};
