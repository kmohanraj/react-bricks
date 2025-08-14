import React, { FC, useEffect, useRef } from "react";
import cx from "classnames";
import { TModal } from "../../type/type";
import { preventBodyScroll } from "../../helper/helper";
import * as Icon from "../../assets/icons/icon";
import "./modal.scss";


export const Modal: FC<TModal> = ({
  id = "",
  closeIcon = Icon.close,
  isShowModal,
  customClass,
  children,
  onModalClose,
  closeAriaLabel = "",
  modalAriaLabel = "",
}) => {
  const modalWindow = useRef<HTMLDivElement>(null);
  const modalContent = useRef(null);
  const modalBody = useRef(null);
  const ModalClass = cx({ "modal-popup": true, "show-modal-popup": isShowModal });

  const prevActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isShowModal) {
      prevActiveElementRef.current = document.activeElement as HTMLElement;
      window.addEventListener("keydown", handleKeyPress);
      if (modalAriaLabel) modalWindow?.current?.focus();
      preventBodyScroll(true);
      document.body.setAttribute(
        "style",
        `position: fixed; top: -${window.scrollY}px; left: 0; right: 0;`
      );
    } else {
      document.body.removeAttribute("style");
      prevActiveElementRef.current?.focus();
      preventBodyScroll(false);
    }
    return () => {
      document.body.removeAttribute("style");
      preventBodyScroll(false);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isShowModal]);

  function handleEscapeKey() {
    onModalClose?.();
    preventBodyScroll(false);
  }

  function handleTabKey(
    e: KeyboardEvent,
    firstElem: Element,
    lastElem: Element
  ) {
    const isShiftAndFirstOrModal =
      e.shiftKey &&
      (document.activeElement === firstElem ||
        document.activeElement === modalWindow.current);
    if (isShiftAndFirstOrModal) {
      e.preventDefault();
      (lastElem as HTMLElement).focus();
    }
    if (!e.shiftKey && document.activeElement === lastElem) {
      e.preventDefault();
      (firstElem as HTMLElement).focus();
    }
  }

  function handleKeyPress(e: KeyboardEvent) {
    const focusElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusContent = modalWindow.current
      ? modalWindow.current.querySelectorAll(focusElements)
      : [];
    const firstElem = focusContent[0];
    const lastElem = focusContent[focusContent.length - 1];
    if (e.key === "Escape") {
      handleEscapeKey();
    }
    if (e.key === "Tab") {
      handleTabKey(e, firstElem, lastElem);
    }
  }

  return (
    <div
      className={`${ModalClass} ${customClass ? customClass : ""}`}
      role="dialog"
      aria-modal
      tabIndex={-1}
      ref={modalWindow}
      id={`modal_${id}`}
      aria-label={modalAriaLabel ? modalAriaLabel : ""}
    >
      <div className="modal-popup-content" ref={modalContent}>
        <div className="close-button-holder ">
          <button
            className="close-button gbh-data-layer"
            onClick={onModalClose}
            aria-label={closeAriaLabel ? closeAriaLabel : "close"}
          >
            {typeof closeIcon === "string" ? (
              <img src={closeIcon} alt="" />
            ) : (
              React.createElement(closeIcon)
            )}
          </button>
        </div>
        <div className="modal-popup-body" ref={modalBody}>
          {isShowModal && children}
        </div>
      </div>
    </div>
  );
};
