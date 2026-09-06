import { FC, ReactNode } from "react";
import cx from "classnames";
import "./card.scss";

interface CardProps {
  /** Main content of the card */
  children: ReactNode;
  /** Top section */
  header?: ReactNode;
  /** Bottom section */
  footer?: ReactNode;
  /** Card style variant */
  variant?: "default" | "elevated" | "outlined";
  /** Custom CSS class */
  customClass?: string;
  /** Click handler */
  onClick?: () => void;
  /** Make card hoverable */
  isHoverable?: boolean;
}

/**
 * Card Component
 * A simple, flexible card container with optional header and footer
 * Perfect for any content: text, images, forms, lists, etc.
 */
export const Card: FC<CardProps> = ({
  header,
  children,
  footer,
  variant = "default",
  customClass = "",
  onClick,
  isHoverable = false,
}) => {
  const cardClass = cx(
    "card",
    `card--${variant}`,
    customClass,
    { "card--hoverable": isHoverable }
  );

  return (
    <div className={cardClass} onClick={onClick}>
      {/* Header section */}
      {header && <div className="card__header">{header}</div>}

      {/* Main content */}
      <div className="card__body">{children}</div>

      {/* Footer section */}
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
};
