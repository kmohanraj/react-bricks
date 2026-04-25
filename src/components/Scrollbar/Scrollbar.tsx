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
  thumbWidth = 8,
  isHideTracks = false,
}: {
  children: ReactNode;
  direction: "vertical" | "horizontal" | "both";
  height?: number;
  thumbWidth?: number;
  isHideTracks?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [maxScrollX, setMaxScrollX] = useState(0);
  const [maxScrollY, setMaxScrollY] = useState(0);

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

  const handleOnWheel = (event: WheelEvent) => {
    if (maxScrollX === 0 && maxScrollY === 0) return; // ✅ No scroll if content fits
    event.preventDefault();
    if ((direction === "vertical" || direction === "both") && maxScrollY > 0) {
      setScrollY((prev) => Math.min(maxScrollY, Math.max(0, prev + event.deltaY)));
    }
    if ((direction === "horizontal" || direction === "both") && maxScrollX > 0) {
      setScrollX((prev) => Math.min(maxScrollX, Math.max(0, prev + event.deltaX)));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleOnWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleOnWheel);
  }, [maxScrollX, maxScrollY, direction]);

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

  return (
    <div
      className="scrollbar-wrapper"
      style={{ maxHeight: height, overflow: "hidden", position: "relative" }}
      ref={containerRef}
    >
      <div
        className="scrollbar-content"
        ref={contentRef}
        style={{
          transform: `translate(${-scrollX}px, ${-scrollY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>

      {/* Horizontal track */}
      {direction !== "vertical" && thumbWidthCalc > 0 && (
        <div
          className={cx("scrollbar-track scrollbar-track-x", {
            "hide-tracks": isHideTracks,
          })}
          style={{ height: thumbWidth }}
        >
          <div
            className="scrollbar-thumb scrollbar-thumb-x"
            style={{
              width: `${thumbWidthCalc}px`,
              transform: `translateX(${thumbXPosition}px)`,
              height: thumbWidth,
            }}
          />
        </div>
      )}

      {/* Vertical track */}
      {direction !== "horizontal" && thumbHeight > 0 && (
        <div
          className={cx("scrollbar-track scrollbar-track-y", {
            "hide-tracks": isHideTracks,
          })}
          style={{ width: thumbWidth }}
        >
          <div
            className="scrollbar-thumb scrollbar-thumb-y"
            style={{
              height: `${thumbHeight}px`,
              transform: `translateY(${thumbYPosition}px)`,
              width: thumbWidth,
            }}
          />
        </div>
      )}
    </div>
  );
};
