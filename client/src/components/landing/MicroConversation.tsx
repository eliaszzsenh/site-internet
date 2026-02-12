import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { translations, Lang } from "@/lib/i18n";

export function MicroConversation({ lang }: { lang: Lang }) {
  const t = translations[lang].chat;
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  const steps = useMemo(
    () => [
      { t: 0, kind: "proactive" as const },
      { t: 1200, kind: "user" as const },
      { t: 2400, kind: "typing" as const },
      { t: 3300, kind: "ai" as const },
      { t: 5200, kind: "minimize" as const },
      { t: 8200, kind: "reset" as const },
    ],
    [],
  );

  useEffect(() => {
    if (reduceMotion) return;

    let alive = true;
    const start = performance.now();

    const tick = () => {
      if (!alive) return;
      const now = performance.now();
      const elapsed = (now - start) % steps[steps.length - 1]!.t;

      const nextIndex = steps.findIndex((s, idx) => elapsed < s.t && idx > 0);
      const computed = nextIndex === -1 ? steps.length - 1 : Math.max(0, nextIndex - 1);
      setStep(computed);
    };

    const raf = () => {
      tick();
      if (alive) requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      alive = false;
    };
  }, [reduceMotion, steps]);

  const showProactive = step >= 0;
  const showUser = step >= 1;
  const showTyping = step >= 2;
  const showAi = step >= 3;
  const minimized = step >= 4;

  return (
    <div className="relative">
      <div className="rounded-[44px] border-[3px] border-black bg-white shadow-xl">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[44px] bg-white">
          <div className="absolute left-1/2 top-4 h-7 w-36 -translate-x-1/2 rounded-full bg-black" />

          <div className="absolute inset-x-0 bottom-0 top-28 px-7 pb-7">
            <div className="relative h-full rounded-3xl border border-black bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-black pb-2">
                <div className="text-[13px] font-bold text-black">{t.assistant}</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-black">
                  {t.online}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {showProactive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-[86%] rounded-xl border border-black bg-black px-3 py-2 text-[13px] leading-relaxed text-white"
                  >
                    {t.proactive}
                  </motion.div>
                )}

                {showUser && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="ml-auto max-w-[86%] rounded-xl border border-black bg-white px-3 py-2 text-[13px] leading-relaxed text-black"
                  >
                    {t.user}
                  </motion.div>
                )}

                {showTyping && !showAi && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex max-w-[70%] items-center gap-1 rounded-xl border border-black bg-black px-3 py-2"
                  >
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
                  </motion.div>
                )}

                {showAi && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-[92%] rounded-xl border border-black bg-black px-3 py-2 text-[13px] leading-relaxed text-white"
                  >
                    {t.ai_response}
                  </motion.div>
                )}
              </div>

              <div className="absolute bottom-4 right-4">
                <motion.div
                  className="flex items-center gap-2 rounded-full border border-black bg-white px-3 py-2 text-[12px] font-bold text-black"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  {minimized ? t.minimized : t.chat}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
