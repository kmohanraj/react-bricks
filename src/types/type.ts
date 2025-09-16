import {
  ChangeEvent,
  Dispatch,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  SyntheticEvent,
  SetStateAction,
  ComponentType,  
} from "react";

export type TButton = {
  id?: string;
  title?: string;
  link?: string;
  type?: string;
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
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
  prefix?: string
  suffix?: string
};

export type TButtonClass = {
  prefix?: string | undefined;
  suffix?: string | undefined;
  customClass?: string;
  variant?: string;
  isDisabled?: boolean;
  type?: string;
};

export type TCheckBox = {
  testId?: string;
  type: "checkbox" | "radio";
  position?: "left" | "right";
  customClass?: string;
  name?: string;
  label?: string;
  onChecked?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  isChecked?: boolean;
  selected?: string;
  value?: string;
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
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  message?: string;
  error?: string;
  placeholder: string;
  inputId: string;
  borderType?: "outlined" | "underlined";
  variant?: "primary" | "ghost";
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
  isNumber?: boolean;
};

export type TModal = {
  id: string;
  title?: string;
  closeIcon?: string;
  isShowModal: boolean;
  customClass?: string;
  children: ReactNode;
  onModalClose: any;
  closeAriaLabel?: string;
  modalAriaLabel?: string;
  maxWidth?: string;
  isStickyHeader?: boolean
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
  customClass?: string;
  variant?: "primary" | "ghost";
  noRecordMessage?: string;
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
  isOuterBorderLess?: boolean;
  isMoreBtn?: boolean;
  onAction?: (data: T) => void;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
  paginationPlacement?: 'left' | 'right' | 'center';
  sortingAscIcon?: string | ComponentType<React.SVGProps<SVGSVGElement>>;
  sortingDesIcon?: string | ComponentType<React.SVGProps<SVGSVGElement>>;
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
  isMoreBtn?: boolean;
  onAction?: (data: T) => void;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
};

export type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  paginationPlacement: 'left' | 'right' | 'center';
};

export type TTableActions<T> = {
  onAction?: (data: T) => void;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
  row: any;
}

export type TImage = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
  onError?: (e: SyntheticEvent<HTMLImageElement, Event>, src: string) => void;
  role?: string
};

export type TPopoverProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: string
}