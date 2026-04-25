import { useCallback, useEffect, useState } from "react";

type Placement = "top" | "bottom" | "left" | "right";

export const usePopoverPosition = () => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [placement, setPlacement] = useState<Placement>("bottom");

  const getBestPlacement = (
    trigger: HTMLDivElement,
    popover: HTMLDivElement,
    preferred: Placement
  ): Placement => {
    const t = trigger.getBoundingClientRect();
    const p = popover.getBoundingClientRect();

    const space = {
      bottom: window.innerHeight - t.bottom,
      top: t.top,
      right: window.innerWidth - t.right,
      left: t.left,
    };

    const fits = {
      bottom: space.bottom >= p.height,
      top: space.top >= p.height,
      right: space.right >= p.width,
      left: space.left >= p.width,
    };

    if (fits[preferred]) return preferred;
    if (fits.bottom) return "bottom";
    if (fits.top) return "top";
    if (fits.right) return "right";
    if (fits.left) return "left";

    // fallback → max space
    return Object.entries(space).sort((a, b) => b[1] - a[1])[0][0] as Placement;
  };

  const calculate = useCallback(
    (
      triggerRef: React.RefObject<HTMLDivElement>,
      popoverRef: React.RefObject<HTMLDivElement>,
      preferred: Placement = "bottom"
    ) => {
      if (!triggerRef.current || !popoverRef.current) return;

      const placement = getBestPlacement(
        triggerRef.current,
        popoverRef.current,
        preferred
      );

      const t = triggerRef.current.getBoundingClientRect();
      const p = popoverRef.current.getBoundingClientRect();

      const coords = {
        bottom: { top: t.bottom + 8, left: t.left },
        top: { top: t.top - p.height - 8, left: t.left },
        right: { top: t.top, left: t.right + 8 },
        left: { top: t.top, left: t.left - p.width - 8 },
      };

      setPlacement(placement);
      setPosition(coords[placement]);
    },
    []
  );

  return { position, placement, calculate };
};
