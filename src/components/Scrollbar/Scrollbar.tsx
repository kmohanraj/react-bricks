import {
  ReactNode,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import cx from "classnames";
import "./scrollbar.scss";

export const Scrollbar = ({
  children,
  direction,
  height = 300,
  width,
  thumbWidth = 8,
  isHideTracks = false,
}: {
  children: ReactNode;
  direction: "vertical" | "horizontal" | "both";
  height?: number;
  width?: number | string;
  thumbWidth?: number;
  isHideTracks?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [maxScrollX, setMaxScrollX] = useState(0);
  const [maxScrollY, setMaxScrollY] = useState(0);
  const [isDraggingY, setIsDraggingY] = useState(false);
  const [isDraggingX, setIsDraggingX] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dragStartY = useRef(0);
  const dragStartX = useRef(0);
  const scrollStartY = useRef(0);
  const scrollStartX = useRef(0);

  const updateScrollLimits = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;
    const newMaxX = Math.max(0, contentRef.current.scrollWidth - containerRef.current.clientWidth);
    const newMaxY = Math.max(0, contentRef.current.scrollHeight - containerRef.current.clientHeight);
    setMaxScrollX(newMaxX);
    setMaxScrollY(newMaxY);
  }, []);

  useEffect(() => {
    updateScrollLimits();
    const observer = new ResizeObserver(updateScrollLimits);
    if (contentRef.current) observer.observe(contentRef.current);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateScrollLimits]);

  const handleOnWheel = useCallback((event: WheelEvent) => {
    if (maxScrollX === 0 && maxScrollY === 0) return;
    event.preventDefault();
    if ((direction === "vertical" || direction === "both") && maxScrollY > 0) {
      setScrollY((prev) => Math.min(maxScrollY, Math.max(0, prev + event.deltaY)));
    }
    if ((direction === "horizontal" || direction === "both") && maxScrollX > 0) {
      setScrollX((prev) => Math.min(maxScrollX, Math.max(0, prev + event.deltaX)));
    }
  }, [maxScrollX, maxScrollY, direction]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleOnWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleOnWheel);
  }, [handleOnWheel]);

  const thumbHeight =
    maxScrollY > 0 && containerRef.current && contentRef.current
      ? (containerRef.current.clientHeight / contentRef.current.scrollHeight) *
        containerRef.current.clientHeight
      : 0;

  const thumbWidthCalc =
    maxScrollX > 0 && containerRef.current && contentRef.current
      ? (containerRef.current.clientWidth / contentRef.current.scrollWidth) *
        containerRef.current.clientWidth
      : 0;

  const thumbYPosition =
    maxScrollY > 0
      ? (scrollY / maxScrollY) * (containerRef.current!.clientHeight - thumbHeight)
      : 0;

  const thumbXPosition =
    maxScrollX > 0
      ? (scrollX / maxScrollX) * (containerRef.current!.clientWidth - thumbWidthCalc)
      : 0;

  // Vertical thumb drag handlers
  const handleThumbYMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingY(true);
    dragStartY.current = e.clientY;
    scrollStartY.current = scrollY;
  };

  // Horizontal thumb drag handlers
  const handleThumbXMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingX(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = scrollX;
  };

  // Mouse move handler for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingY && containerRef.current && contentRef.current) {
        const deltaY = e.clientY - dragStartY.current;
        const scrollRatio = deltaY / (containerRef.current.clientHeight - thumbHeight);
        const newScrollY = scrollStartY.current + scrollRatio * maxScrollY;
        setScrollY(Math.min(maxScrollY, Math.max(0, newScrollY)));
      }
      if (isDraggingX && containerRef.current && contentRef.current) {
        const deltaX = e.clientX - dragStartX.current;
        const scrollRatio = deltaX / (containerRef.current.clientWidth - thumbWidthCalc);
        const newScrollX = scrollStartX.current + scrollRatio * maxScrollX;
        setScrollX(Math.min(maxScrollX, Math.max(0, newScrollX)));
      }
    };

    const handleMouseUp = () => {
      setIsDraggingY(false);
      setIsDraggingX(false);
    };

    if (isDraggingY || isDraggingX) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDraggingY, isDraggingX, maxScrollY, maxScrollX, thumbHeight, thumbWidthCalc]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const step = 50;
      switch (e.key) {
        case "ArrowDown":
          if (maxScrollY > 0) {
            e.preventDefault();
            setScrollY((prev) => Math.min(maxScrollY, prev + step));
          }
          break;
        case "ArrowUp":
          if (maxScrollY > 0) {
            e.preventDefault();
            setScrollY((prev) => Math.max(0, prev - step));
          }
          break;
        case "ArrowRight":
          if (maxScrollX > 0) {
            e.preventDefault();
            setScrollX((prev) => Math.min(maxScrollX, prev + step));
          }
          break;
        case "ArrowLeft":
          if (maxScrollX > 0) {
            e.preventDefault();
            setScrollX((prev) => Math.max(0, prev - step));
          }
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
      return () => container.removeEventListener("keydown", handleKeyDown);
    }
  }, [maxScrollX, maxScrollY]);

  return (
    <div
      className="scrollbar-wrapper"
      style={{ 
        maxHeight: direction !== "horizontal" ? height : undefined,
        height: direction !== "horizontal" ? height : "auto",
        width: width || "100%",
        overflow: "hidden", 
        position: "relative" 
      }}
      ref={containerRef}
      tabIndex={0}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="scrollbar-content"
        ref={contentRef}
        style={{
          transform: `translate(${-scrollX}px, ${-scrollY}px)`,
          transition: isDraggingX || isDraggingY ? "none" : "transform 0.15s ease-out",
          display: "inline-block",
          minWidth: direction === "horizontal" || direction === "both" ? "max-content" : "100%",
        }}
      >
        {children}
      </div>

      {/* Horizontal track */}
      {direction !== "vertical" && thumbWidthCalc > 0 && (
        <div
          className={cx("scrollbar-track scrollbar-track-x", {
            "hide-tracks": isHideTracks,
            "show": isHovering || isDraggingX,
          })}
          style={{ height: thumbWidth }}
        >
          <div
            className={cx("scrollbar-thumb scrollbar-thumb-x", {
              "dragging": isDraggingX,
            })}
            style={{
              width: `${thumbWidthCalc}px`,
              transform: `translateX(${thumbXPosition}px)`,
              height: thumbWidth,
              cursor: isDraggingX ? "grabbing" : "grab",
            }}
            onMouseDown={handleThumbXMouseDown}
          />
        </div>
      )}

      {/* Vertical track */}
      {direction !== "horizontal" && thumbHeight > 0 && (
        <div
          className={cx("scrollbar-track scrollbar-track-y", {
            "hide-tracks": isHideTracks,
            "show": isHovering || isDraggingY,
          })}
          style={{ width: thumbWidth }}
        >
          <div
            className={cx("scrollbar-thumb scrollbar-thumb-y", {
              "dragging": isDraggingY,
            })}
            style={{
              height: `${thumbHeight}px`,
              transform: `translateY(${thumbYPosition}px)`,
              width: thumbWidth,
              cursor: isDraggingY ? "grabbing" : "grab",
            }}
            onMouseDown={handleThumbYMouseDown}
          />
        </div>
      )}
    </div>
  );
};
