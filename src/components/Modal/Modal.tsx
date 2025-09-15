import { FC, useEffect, useRef } from "react";
import cx from "classnames";
import { TModal } from "../../types/type";
import { preventBodyScroll } from "../../helper/helper";
import * as Icon from "../../assets/icons/icon";
import "./modal.scss";
import { Image } from "../Image/Image";

export const Modal: FC<TModal> = ({
  id = "",
  title,
  closeIcon,
  isShowModal,
  customClass,
  children,
  onModalClose,
  closeAriaLabel = "",
  modalAriaLabel = "",
  maxWidth = "",
  isStickyHeader
}) => {
  const modalWindow = useRef<HTMLDivElement>(null);
  const modalContent = useRef<HTMLDivElement>(null);
  const modalBody = useRef(null);
  const modalClass = cx(
    {
      "modal-popup": true,
      "show-modal-popup": isShowModal,
    },
    customClass ? customClass : "",
    isStickyHeader ? 'sticky-header': null
  );

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
      if (modalContent.current) {
        modalContent.current.style.maxWidth = `${maxWidth}px`;
      }
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
  }, [isShowModal, maxWidth]);

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
      className={modalClass}
      role="dialog"
      aria-modal
      tabIndex={-1}
      ref={modalWindow}
      id={`modal_${id}`}
      aria-label={modalAriaLabel ? modalAriaLabel : ""}
    >
      <div className="modal-popup-content" ref={modalContent}>
        <div className="modal-popup-content-header">
          <h2>{title}</h2>
          <button
            className="close-button"
            onClick={onModalClose}
            aria-label={closeAriaLabel ? closeAriaLabel : "close"}
          >
            <Image src={closeIcon ? closeIcon : Icon.close as never} />       
          </button>
        </div>
        <div className="modal-popup-content-body" ref={modalBody}>
          {isShowModal && children}
        </div>
      </div>
    </div>
  );
};
