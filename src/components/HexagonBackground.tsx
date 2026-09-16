import type { ComponentProps } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./HexagonBackground.module.css";

interface HexagonBackgroundProps extends ComponentProps<"div"> {
  /** The size (width) of each flat-top hexagon, in pixels. */
  hexagonSize?: number;
  /** The gap between adjacent hexagons, in pixels. */
  hexagonMargin?: number;
  /** Color scheme to match the section it sits on — dark ink surfaces (default) or light/cream ones. */
  tone?: "dark" | "light";
  /** Props applied to every individual hexagon cell. */
  hexagonProps?: ComponentProps<"div">;
}

/** How far (px) from the cursor a hexagon starts picking up the gold hover glow. */
const GLOW_RADIUS = 220;

/**
 * Ambient, self-tiling hexagon grid for section backgrounds — sized to its container
 * via ResizeObserver. Static by default (see the CSS module for why); cells near the
 * cursor pick up a gold border/glow (imperative DOM writes, not React state, so the
 * hover effect can't trigger a re-render storm). Purely decorative (aria-hidden,
 * pointer-events: none) so it never competes with foreground interaction.
 */
export function HexagonBackground({
  hexagonSize = 75,
  hexagonMargin = 3,
  tone = "dark",
  hexagonProps,
  className,
  style,
  ...props
}: HexagonBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hexRefs = useRef(new Map<string, HTMLDivElement>());
  const visibleRef = useRef(false);
  const [grid, setGrid] = useState({ columns: 0, rows: 0 });

  const hexHeight = hexagonSize * (Math.sqrt(3) / 2);
  const columnStep = hexagonSize * 0.75 + hexagonMargin;
  const rowStep = hexHeight + hexagonMargin;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setGrid({
        columns: Math.ceil(width / columnStep) + 1,
        rows: Math.ceil(height / rowStep) + 2,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [columnStep, rowStep]);

  // Only run the pointer-glow work while this field is actually on screen, so the other
  // (possibly off-screen) hexagon fields on the page stay completely idle.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: `${GLOW_RADIUS}px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hexagons = useMemo(() => {
    const list: { key: string; col: number; row: number; x: number; y: number }[] = [];
    for (let col = 0; col < grid.columns; col++) {
      for (let row = -1; row < grid.rows; row++) {
        list.push({
          key: `${col}-${row}`,
          col,
          row,
          x: col * columnStep,
          y: row * rowStep + (col % 2 === 1 ? rowStep / 2 : 0),
        });
      }
    }
    return list;
  }, [grid, columnStep, rowStep]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    let pointer: { x: number; y: number } | null = null;
    // Only the hexagons currently glowing — cleared/rebuilt each frame instead of
    // scanning every hexagon in the field, so cost never scales with field size.
    let activeNodes = new Map<string, HTMLDivElement>();

    const clearAll = () => {
      activeNodes.forEach((node) => {
        node.classList.remove(styles.hexActive);
        node.style.removeProperty("--hex-glow");
      });
      activeNodes = new Map();
    };

    // The grid is regular, so instead of looping every hexagon to find which ones are
    // near the cursor, work out the pointer's own (col, row) cell directly and only
    // examine the small neighborhood that could possibly be within GLOW_RADIUS — O(1)
    // relative to field size instead of O(hexagon count), which is what made this
    // noticeably janky on the larger hexagon fields (hundreds of cells each).
    const colRadius = Math.ceil(GLOW_RADIUS / columnStep) + 1;
    const rowRadius = Math.ceil(GLOW_RADIUS / rowStep) + 1;

    const applyGlow = () => {
      raf = 0;
      if (!pointer || !visibleRef.current) {
        clearAll();
        return;
      }

      const rect = el.getBoundingClientRect();
      const localX = pointer.x - rect.left;
      const localY = pointer.y - rect.top;

      if (
        localX < -GLOW_RADIUS ||
        localX > rect.width + GLOW_RADIUS ||
        localY < -GLOW_RADIUS ||
        localY > rect.height + GLOW_RADIUS
      ) {
        clearAll();
        return;
      }

      const centerCol = Math.round(localX / columnStep);
      const nextActive = new Map<string, HTMLDivElement>();

      for (let col = centerCol - colRadius; col <= centerCol + colRadius; col++) {
        const colOffset = col % 2 === 1 ? rowStep / 2 : 0;
        const centerRow = Math.round((localY - colOffset) / rowStep) - 1;
        for (let row = centerRow - rowRadius; row <= centerRow + rowRadius; row++) {
          const key = `${col}-${row}`;
          const node = hexRefs.current.get(key);
          if (!node) continue;
          const x = col * columnStep;
          const y = row * rowStep + colOffset;
          const dx = x + hexagonSize / 2 - localX;
          const dy = y + hexHeight / 2 - localY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GLOW_RADIUS) {
            node.style.setProperty("--hex-glow", (1 - dist / GLOW_RADIUS).toFixed(3));
            node.classList.add(styles.hexActive);
            nextActive.set(key, node);
          }
        }
      }

      activeNodes.forEach((node, key) => {
        if (!nextActive.has(key)) {
          node.classList.remove(styles.hexActive);
          node.style.removeProperty("--hex-glow");
        }
      });
      activeNodes = nextActive;
    };

    const onMove = (e: MouseEvent) => {
      if (!visibleRef.current) return;
      pointer = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(applyGlow);
    };

    const onLeave = () => {
      pointer = null;
      clearAll();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hexagonSize, hexHeight, columnStep, rowStep]);

  return (
    <div
      ref={containerRef}
      className={[styles.field, tone === "light" ? styles.light : "", className].filter(Boolean).join(" ")}
      style={style}
      aria-hidden="true"
      {...props}
    >
      {hexagons.map(({ key, x, y }) => (
        <div
          key={key}
          ref={(node) => {
            if (node) hexRefs.current.set(key, node);
            else hexRefs.current.delete(key);
          }}
          {...hexagonProps}
          className={[styles.hexagon, hexagonProps?.className].filter(Boolean).join(" ")}
          style={{
            width: hexagonSize,
            height: hexHeight,
            left: x,
            top: y,
            ...hexagonProps?.style,
          }}
        />
      ))}
    </div>
  );
}
