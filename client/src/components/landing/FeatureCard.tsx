import { useEffect, useRef } from "react";

function useInViewGlow<T extends HTMLElement>(threshold = 0.5) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("ilnaj-glow-enter");

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible", "ilnaj-glow-pulse");
            window.setTimeout(() => entry.target.classList.remove("ilnaj-glow-pulse"), 1400);
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}

export function FeatureCard({
  icon,
  title,
  description,
  testId,
  offset = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  testId: string;
  offset?: number;
}) {
  const ref = useInViewGlow<HTMLDivElement>(0.5);

  return (
    <div
      ref={ref}
      className={
        "ilnaj-active-border ilnaj-noise rounded-none bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
      }
      style={{ translate: `0 ${offset}px` }}
      data-testid={testId}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-none border border-black bg-white">
          <div className="text-black">{icon}</div>
        </div>
        <div>
          <div className="text-[20px] font-bold tracking-tight text-black" data-testid={`${testId}-title`}>
            {title}
          </div>
          <p
            className="mt-2 text-[15px] leading-relaxed text-black/70"
            data-testid={`${testId}-description`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
