import { useState, useRef, useEffect, useLayoutEffect } from "react";
import cx from "classnames";
import { useGetPosition } from "../../hooks/useGetPosition";
import { TPopoverProps } from "@/types/type";
import "./popover.scss";

// Helper to calculate best placement based on available space
const getPlacement = (
  trigger: HTMLDivElement | null
): "top" | "bottom" | "left" | "right" => {
  if (!trigger) return "bottom";
  const rect = trigger.getBoundingClientRect();
  const space = {
    top: rect.top,
    bottom: window.innerHeight - rect.bottom,
    left: rect.left,
    right: window.innerWidth - rect.right,
  };
  return Object.entries(space).sort((a, b) => b[1] - a[1])[0][0] as
    | "top"
    | "bottom"
    | "left"
    | "right";
};

// Helper to handle outside click
const useOutsideClick = (
  popoverRef: React.RefObject<HTMLDivElement>,
  triggerRef: React.RefObject<HTMLDivElement>,
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (!visible) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !popoverRef.current?.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible, popoverRef, triggerRef, setVisible]);
};

export const Popover: React.FC<TPopoverProps> = ({ children, content }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState<
    "top" | "bottom" | "left" | "right"
  >("bottom");
  const { position, calculatePosition } = useGetPosition();

  useOutsideClick(popoverRef, triggerRef, visible, setVisible);

  useLayoutEffect(() => {
    if (visible) {
      const place = getPlacement(triggerRef.current);
      setPlacement(place);
      calculatePosition(triggerRef, popoverRef, place);
    }
  }, [visible]);

  return (
    <>
      <span ref={triggerRef} onClick={() => setVisible((prev) => !prev)}>
        {children}
      </span>
      {visible && (
        <div
          ref={popoverRef}
          className={cx("popover-content", placement, {
            "popover-visible": visible,
          })}
          style={{
            position: "absolute",
            top: position?.top ?? -9999,
            left: position?.left ?? -9999,
            zIndex: 1000,
            visibility: position ? "visible" : "hidden",
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};
