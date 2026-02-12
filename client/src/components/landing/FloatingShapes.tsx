import { useMemo } from "react";

export function FloatingShapes() {
  const shapes = useMemo(
    () => [
      {
        key: "hero-circle",
        className: "rounded-full",
        style: { width: 180, height: 180, top: -40, right: -40, background: "#E5E5E5", opacity: 0.5 },
      },
      {
        key: "hero-square",
        className: "rounded-2xl",
        style: { width: 64, height: 64, bottom: 30, left: -10, background: "#D4D4D4", opacity: 0.5 },
      },
      {
        key: "feat-tri",
        className: "",
        style: {
          width: 0,
          height: 0,
          borderLeft: "80px solid transparent",
          borderRight: "80px solid transparent",
          borderBottom: "140px solid #F5F5F5",
          top: 140,
          left: "46%",
          opacity: 0.5,
          position: 'absolute'
        } as React.CSSProperties,
      },
      {
        key: "cta-circle",
        className: "rounded-full",
        style: { width: 120, height: 120, top: 40, left: "8%", background: "#E5E5E5", opacity: 0.5 },
      },
    ],
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((s) => (
        <div key={s.key} className={`ilnaj-floating-shape ${s.className}`} style={s.style} />
      ))}
    </div>
  );
}
