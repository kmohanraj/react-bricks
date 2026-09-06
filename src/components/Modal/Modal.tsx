

import { useEffect, ReactNode } from "react";
import { Button } from "../Button/Button";
import "./modal.scss";

interface ModalAction {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ModalAction[];
  closeButton?: boolean;
  backdropClickable?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  closeButton = true,
  backdropClickable = true,
}: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
      <div
        className="modal-backdrop"
        onClick={backdropClickable ? onClose : undefined}
        role="presentation"
      />

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <div className="modal-header">
            <h3 className="modal-header__title">{title}</h3>

            {closeButton && (
              <button
                className="modal-header__close"
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="modal-body">{children}</div>

        {actions && actions.length > 0 && (
          <div className="modal-footer">
            {actions.map((action, index) => (
              <Button
                key={index}
                label={action.label}
                variant={action.variant || "secondary"}
                onClick={action.onClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

