import React, { FC } from "react";
import cx from "classnames";
import "./drawer.scss";

type TDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Drawer: FC<TDrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div className={cx("backdrop", { visible: isOpen })} onClick={onClose} />

      <div className={cx("drawer", { open: isOpen })}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </>
  );
};
