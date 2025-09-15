import { useCallback, useState } from "react";

type EPlacement = "top" | "bottom" | "left" | "right";

export const useGetPlacement = () => {
  const [placement, setPlacement] = useState<
    "top" | "bottom" | "left" | "right"
  >("bottom");

  const getPlacement = useCallback(
    (triggerRef: React.RefObject<HTMLElement>) => {
      const trigger = triggerRef.current;
      if (!trigger) return "bottom"; // default

      const rect = trigger.getBoundingClientRect();
      const space = {
        top: rect.top,
        bottom: window.innerHeight - rect.bottom,
        left: rect.left,
        right: window.innerWidth - rect.right,
      };

      // Choose the placement with the most space
      const sorted = Object.entries(space).sort((a, b) => b[1] - a[1]);
      setPlacement(sorted[0][0] as EPlacement);
    },
    [placement]
  );

  return { placement, getPlacement };
};
