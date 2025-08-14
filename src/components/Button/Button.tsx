import { FC } from "react";
import cx from "classnames";
import { TButton } from "../../type/type";
import { EllipsisLoader } from "../EllipsisLoader/EllipsisLoader";
import "./button.scss";

export const Button: FC<TButton> = ({
  id = "",
  title = "",
  link = "",
  type = "",
  label = "",
  variant = "",
  loaderSize = "sm",
  loaderColor = 'primary',
  onClick,
  onKeyDown,
  customClass = "",
  isLoading = false,
  isDisabled = false,
  role = "",
  ariaLabelledBy = "",
  ariaDescription = "",
}) => {
  const ElementTag = type === "link" && link ? "a" : "button";
  const buttonClass = cx(
    "btn",
    customClass ? customClass : null,
    variant ? variant : null,
    isDisabled ? "disabled" : null,
    {
      link: type === "link",
    }
  );

  return (
    <ElementTag
      id={id}
      title={title}
      href={link}
      className={buttonClass}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={isDisabled}
      role={role}
      aria-labelledby={ariaLabelledBy ?? null}
      aria-description={ariaDescription ?? null}
    >
      {isLoading ? <EllipsisLoader color={loaderColor} size={loaderSize} /> : label}
    </ElementTag>
  );
};
