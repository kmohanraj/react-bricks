import {
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
// import cx from "classnames";
import "./popover.scss";

/* ---------------- Types ---------------- */

type Placement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

type PopoverProps = {
  title: ReactNode;
  children: ReactNode | ((closePopover: () => void) => ReactNode);
  placement?: Placement | "auto";
  isClickClose?: boolean;
  offset?: number;
  showArrow?: boolean;
  onClose?: () => void;
};

/* ---------------- Constants ---------------- */

// const OFFSET = 8;

/* ---------------- Helpers ---------------- */

const resolvePlacement = (
  title: DOMRect,
  popover: DOMRect,
  preferred: Placement | "auto"
): Placement => {
  if (preferred !== "auto") return preferred;

  const spaceBottom = window.innerHeight - title.bottom;
  const spaceTop = title.top;
  const spaceRight = window.innerWidth - title.right;
  const spaceLeft = title.left;

  // vertical decision (prefer bottom, fallback to top)
  const vertical =
    spaceBottom >= popover.height + 8 ? "bottom" :
    spaceTop >= popover.height + 8 ? "top" :
    "bottom";

  // horizontal fit check (prefer center)
  const centerLeft = title.left + title.width / 2 - popover.width / 2;
  const fitsCenter =
    centerLeft >= 8 &&
    centerLeft + popover.width <= window.innerWidth - 8;

  if (fitsCenter) return vertical;

  // edge cases: use start/end based on available space
  const fitsEnd = title.right - popover.width >= 8;
  const fitsStart = title.left + popover.width <= window.innerWidth - 8;

  if (fitsEnd) return `${vertical}-end`;
  if (fitsStart) return `${vertical}-start`;

  // fallback to center if no horizontal space
  return vertical;
};


const calculatePosition = (
  t: DOMRect,
  p: DOMRect,
  placement: Placement,
  offset: number
) => {
  const [base, align] = placement.split("-") as [string, string | undefined];

  let top = 0;
  let left = 0;

  // Vertical placements
  if (base === "bottom") {
    top = t.bottom + offset;
    left =
      align === "start"
        ? t.left
        : align === "end"
        ? t.right - p.width
        : t.left + t.width / 2 - p.width / 2;
  }

  if (base === "top") {
    top = t.top - p.height - offset;
    left =
      align === "start"
        ? t.left
        : align === "end"
        ? t.right - p.width
        : t.left + t.width / 2 - p.width / 2;
  }

  // Horizontal placements
  if (base === "left") {
    left = t.left - p.width - offset;
    top = t.top + t.height / 2 - p.height / 2;
  }

  if (base === "right") {
    left = t.right + offset;
    top = t.top + t.height / 2 - p.height / 2;
  }

  // Constrain to viewport
  const minLeft = 8;
  const maxLeft = window.innerWidth - p.width - 8;
  const minTop = 8;
  const maxTop = window.innerHeight - p.height - 8;

  left = Math.max(minLeft, Math.min(left, maxLeft));
  top = Math.max(minTop, Math.min(top, maxTop));

  return { top, left };
};


/* ---------------- Component ---------------- */

export const Popover: FC<PopoverProps> = ({
  title,
  children,
  placement = "auto",
  isClickClose = true,
  offset = 8,
  showArrow = false,
  onClose,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [finalPlacement, setFinalPlacement] =
    useState<Placement>("bottom");

  /* -------- Position Update -------- */
  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const t = triggerRef.current.getBoundingClientRect();
    const p = popoverRef.current.getBoundingClientRect();

    const resolved = resolvePlacement(t, p, placement);
    setFinalPlacement(resolved);
    setPos(calculatePosition(t, p, resolved, offset));
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, placement]);

  useEffect(() => {
    if (!open) return;

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  /* -------- Outside Click -------- */
  useEffect(() => {
    if (!open || !isClickClose) return;

    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, isClickClose]);

  return (
    <>
      <div
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        style={{ display: "inline-flex" }}
      >
        {title}
      </div>

      {open &&
        createPortal(
          <div
            ref={popoverRef}
            className={`popover-content ${finalPlacement}`}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
            }}
          >
            {showArrow && <span className="popover-arrow" />}
            {typeof children === "function"
              ? children(() => {
                  setOpen(false);
                  onClose?.();
                })
              : children}
          </div>,
          document.body
        )}
    </>
  );
};
