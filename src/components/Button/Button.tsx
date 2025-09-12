import { FC } from "react";
import cx from "classnames";
import { TButton, TButtonClass } from "../../types/type";
import { EllipsisLoader } from "../EllipsisLoader/EllipsisLoader";
import { Image } from "../Image/Image";
import "./button.scss";

const getElementTag = (type: string, link: string) => {
  return type === "link" && link ? "a" : "button";
};

const getButtonClass = ({
  prefix,
  suffix,
  customClass,
  variant,
  isDisabled,
  type,
}: TButtonClass): string => {
  return cx(
    "btn",
    prefix ? "prefix" : null,
    suffix ? "suffix" : null,
    customClass ? customClass : null,
    variant ? variant : null,
    isDisabled ? "disabled" : null,
    {
      link: type === "link",
    }
  );
};

export const Button: FC<TButton> = ({
  id = "",
  title = "",
  link = "",
  type = "",
  label = "",
  variant = "",
  loaderSize = "sm",
  loaderColor = "primary",
  onClick,
  onKeyDown,
  customClass = "",
  isLoading = false,
  isDisabled = false,
  role = "",
  ariaLabelledBy = "",
  ariaDescription = "",
  prefix,
  suffix,
}) => {
  const ElementTag = getElementTag(type, link);
  const buttonClass = getButtonClass({
    prefix,
    suffix,
    customClass,
    variant,
    isDisabled,
    type,
  });

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
      {isLoading && <EllipsisLoader color={loaderColor} size={loaderSize} />}
      {prefix && <Image src={prefix} className="prefix" role="presentation" />}
      <span>{label}</span>
      {suffix && <Image src={suffix} className="suffix" role="presentation" />}
    </ElementTag>
  );
};
