import { FC } from "react";
import cx from "classnames";
import { TButton, TButtonClass } from "../../types/type";
import { EllipsisLoader } from "../EllipsisLoader/EllipsisLoader";
import { Image } from "../Image/Image";
import "./button.scss";

const getElementTag = (type: string, link: string) => {
  return type === "link" && link ? "a" : "button";
};

type TButtonPropsReturn = {
  href?: string;
  id?: string;
  role?: string;
  title?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  disabled?: boolean;
  isSmall?: boolean
};

const getButtonClass = ({
  prefix,
  suffix,
  customClass = "",
  variant,
  isDisabled,
  type,
  isSmall
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
    },
    isSmall ? "small-btn" : null  
  );
};

const getButtonProps = ({
  href,
  id,
  role,
  title,
  ariaLabelledBy,
  ariaDescription,
  isDisabled,
}: {
  href?: string;
  id?: string;
  role?: string;
  title?: string;
  ariaLabelledBy?: string;
  ariaDescription?: string;
  isDisabled?: boolean;
}): TButtonPropsReturn => {
  return {
    ...(href && { href }),
    ...(id && { id }),
    ...(role && { role }),
    ...(title && { title }),
    ...(ariaLabelledBy && { "aria-labelledby": ariaLabelledBy }),
    ...(ariaDescription && { "aria-describedby": ariaDescription }),
    ...(isDisabled && { disabled: isDisabled }),
  };
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
  isSmall = false,
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
    isSmall
  });

  const buttonProps = getButtonProps({
    href: link,
    id,
    role,
    title,
    ariaLabelledBy,
    ariaDescription,
    isDisabled,
  });

  return (
    <ElementTag
      className={buttonClass}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={isDisabled}
      {...buttonProps}
    >
      {isLoading && <EllipsisLoader color={loaderColor} size={loaderSize} />}
      {prefix && <Image src={prefix} className="prefix" role="presentation" />}
      {!isLoading && label ? <span>{label}</span> : null}
      {suffix && <Image src={suffix} className="suffix" role="presentation" />}
    </ElementTag>
  );
};
