
import React, { type FC, useEffect, useContext, createContext } from "react";
import cx from "classnames";
import { Button } from "../Button/Button";
import "./drawer.scss";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  position?: "left" | "right";
  closeButton?: boolean;
  backdropClickable?: boolean;
  level?: number;
}

// Context for tracking drawer nesting level
const DrawerContext = createContext<number>(0);

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 500,
  position = "right",
  closeButton = true,
  backdropClickable = true,
  level,
}) => {
  const parentLevel = useContext(DrawerContext);
  const currentLevel = level !== undefined ? level : parentLevel + 1;
  const baseZIndex = 9999;
  const zIndex = baseZIndex + currentLevel * 100;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <DrawerContext.Provider value={currentLevel}>
      <div
        className={cx("drawer-overlay", {
          open: isOpen,
        })}
        style={{ zIndex }}
      >
        <div
          className="drawer-backdrop"
          onClick={backdropClickable ? onClose : undefined}
          role="presentation"
          style={{
            zIndex: zIndex,
          }}
        />

        <aside
          className={cx("drawer-panel", {
            open: isOpen,
            [`drawer-panel--${position}`]: position,
            "drawer-panel--nested": currentLevel > 0,
          })}
          style={{
            width:
              typeof width === "number"
                ? `${width}px`
                : width,
            zIndex: zIndex + 1,
          }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {title && (
            <div className="drawer-header">
              <h3 className="drawer-header__title">{title}</h3>

              {closeButton && (
                <button
                  className="drawer-header__close"
                  onClick={onClose}
                  aria-label="Close drawer"
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          <div className="drawer-content">
            {children}
          </div>

          {footer && (
            <div className="drawer-footer">
              {footer}
            </div>
          )}
        </aside>
      </div>
    </DrawerContext.Provider>
  );
};
