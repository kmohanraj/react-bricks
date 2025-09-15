import { useState, useCallback } from "react";

type Position = { top: number; left: number };
type Placement = "top" | "bottom" | "left" | "right";

export const useGetPosition = (): {
  position: Position;
  calculatePosition: (
    triggerRef: React.RefObject<HTMLElement>,
    popoverRef: React.RefObject<HTMLElement>,
    placement: Placement
  ) => void;
} => {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const calculatePosition = useCallback(
    (
      triggerRef: React.RefObject<HTMLElement>,
      popoverRef: React.RefObject<HTMLElement>,
      placement: Placement
    ) => {
      const trigger = triggerRef.current;
      const popover = popoverRef.current;

      if (!trigger || !popover) return;

      const triggerRect = trigger.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();

      let top = 0,
        left = 0;
      const offset = 10;

      switch (placement) {
        case "top":
          top = triggerRect.top - popoverRect.height - offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case "left":
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.left - popoverRect.width - offset;
          break;
        case "right":
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.right + offset;
          break;
        default:
          top = triggerRect.bottom + offset;
          left = triggerRect.left;
      }

      setPosition({
        top: top + window.scrollY,
        left: left + window.scrollX,
      });
    },
    []
  );

  return { position, calculatePosition };
};
