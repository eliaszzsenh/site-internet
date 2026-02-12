import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, CreditCard, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  role: "ai" | "user";
  text: string;
};

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

function FloatingShapes() {
  const shapes = useMemo(
    () => [
      {
        key: "hero-circle",
        className: "rounded-full",
        style: { width: 180, height: 180, top: -40, right: -40, background: "#8B5CF6", opacity: 0.05 },
      },
      {
        key: "hero-square",
        className: "rounded-2xl",
        style: { width: 64, height: 64, bottom: 30, left: -10, background: "#3B82F6", opacity: 0.08 },
      },
      {
        key: "feat-tri",
        className: "",
        style: {
          width: 0,
          height: 0,
          borderLeft: "80px solid transparent",
          borderRight: "80px solid transparent",
          borderBottom: "140px solid #06B6D4",
          top: 140,
          left: "46%",
          opacity: 0.04,
        } as React.CSSProperties,
      },
      {
        key: "cta-circle",
        className: "rounded-full",
        style: { width: 120, height: 120, top: 40, left: "8%", background: "#8B5CF6", opacity: 0.04 },
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

function MicroConversation() {
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

  const messages: Message[] = useMemo(
    () => [
      { id: "m1", role: "ai", text: "Need help booking an appointment?" },
      { id: "m2", role: "user", text: "Yes, Tuesday at 3pm" },
      { id: "m3", role: "ai", text: "Perfect! Booked for Feb 18 at 3:00 PM. Confirmation sent \u2713" },
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
      const elapsed = now - start;

      const nextIndex = steps.findIndex((s, idx) => elapsed < s.t && idx > 0);
      const computed = nextIndex === -1 ? steps.length - 1 : Math.max(0, nextIndex - 1);
      setStep(computed);

      if (elapsed > steps[steps.length - 1]!.t) {
        // Restart
        alive = false;
        setStep(0);
        window.setTimeout(() => {
          if (!alive) {
            // noop
          }
        }, 0);
      }
    };

    const raf = () => {
      tick();
      if (alive) requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const interval = window.setInterval(() => {
      // hard reset loop
      setStep(0);
    }, steps[steps.length - 1]!.t);

    return () => {
      alive = false;
      window.clearInterval(interval);
    };
  }, [reduceMotion, steps]);

  const showProactive = step >= 0;
  const showUser = step >= 1;
  const showTyping = step >= 2;
  const showAi = step >= 3;
  const minimized = step >= 4;

  return (
    <div className="relative">
      <div className="rounded-[44px] border border-black/10 bg-white shadow-[0_30px_90px_-70px_rgba(15,23,42,0.35)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[44px] bg-gradient-to-b from-white to-[#f7f7ff]">
          <div className="absolute left-1/2 top-4 h-7 w-36 -translate-x-1/2 rounded-full bg-black/90" />

          <div className="absolute inset-x-0 top-20 px-7">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded-full bg-black/10" />
              <div className="h-3 w-12 rounded-full bg-black/10" />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 top-28 px-7 pb-7">
            <div className="relative h-full rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-black/5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-medium text-foreground">ILNAJ Assistant</div>
                <div className="rounded-full bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-700">
                  Online
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {showProactive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="max-w-[86%] rounded-2xl bg-violet-500 px-3 py-2 text-[13px] leading-relaxed text-white"
                    data-testid="text-chat-ai-1"
                  >
                    {messages[0]!.text}
                  </motion.div>
                )}

                {showUser && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                    className="ml-auto max-w-[86%] rounded-2xl bg-zinc-100 px-3 py-2 text-[13px] leading-relaxed text-zinc-900"
                    data-testid="text-chat-user-1"
                  >
                    {messages[1]!.text}
                  </motion.div>
                )}

                {showTyping && !showAi && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="inline-flex max-w-[70%] items-center gap-1 rounded-2xl bg-violet-500 px-3 py-2"
                    aria-label="Assistant typing"
                    data-testid="status-chat-typing"
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
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="max-w-[92%] rounded-2xl bg-violet-500 px-3 py-2 text-[13px] leading-relaxed text-white"
                    data-testid="text-chat-ai-2"
                  >
                    {messages[2]!.text}
                  </motion.div>
                )}
              </div>

              <div className="absolute bottom-4 right-4">
                <motion.div
                  animate={minimized ? { scale: 0.95, opacity: 0.9 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-2 text-[12px] font-medium text-foreground ring-1 ring-black/5"
                  data-testid="status-chat-widget"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-500 text-white">
                    <Sparkles className="h-4 w-4" aria-hidden />
                  </span>
                  {minimized ? "Booked \u2713" : "Chat"}
                </motion.div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-[90%] -translate-x-1/2 rounded-[28px] bg-violet-500/10 blur-2xl"
        aria-hidden
      />

      {minimized && (
        <div
          className="pointer-events-none absolute -right-2 -top-2 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]"
          aria-hidden
        />
      )}
    </div>
  );
}

function FeatureCard({
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
        "ilnaj-active-border ilnaj-noise rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
      }
      style={{ translate: `0 ${offset}px` }}
      data-testid={testId}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 ring-1 ring-black/5">
          <div className="text-violet-600">{icon}</div>
        </div>
        <div>
          <div className="text-[20px] font-semibold tracking-[-0.01em] text-foreground" data-testid={`${testId}-title`}>
            {title}
          </div>
          <p
            className="mt-2 text-[15px] leading-relaxed text-muted-foreground"
            data-testid={`${testId}-description`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".ilnaj-active-border");
    const onEnter = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      t.classList.add("ilnaj-pulse-border");
      window.setTimeout(() => t.classList.remove("ilnaj-pulse-border"), 450);
    };

    els.forEach((el) => el.addEventListener("mouseenter", onEnter));
    return () => els.forEach((el) => el.removeEventListener("mouseenter", onEnter));
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <div className="flex items-center gap-2" data-testid="text-brand">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-sm" aria-hidden />
            <div className="text-[15px] font-semibold tracking-[-0.02em]">ILNAJ</div>
          </div>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            <button
              className="text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => scrollTo("features")}
              data-testid="button-nav-features"
            >
              How it works
            </button>
            <button
              className="text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => scrollTo("integration")}
              data-testid="button-nav-integration"
            >
              Integration
            </button>
            <button
              className="text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => scrollTo("steps")}
              data-testid="button-nav-steps"
            >
              Steps
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={() => scrollTo("cta")}
              data-testid="button-talk"
            >
              Talk to us
            </Button>
            <Button onClick={() => scrollTo("device")} data-testid="button-see-action">
              See it in action
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </header>

      <section id="hero" className="relative ilnaj-shadow-gradient-hero">
        <FloatingShapes />
        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-28 md:pb-28 md:pt-40">
          <div className="grid items-center gap-14 md:grid-cols-12">
            <div className="md:col-span-7 md:col-start-2">
              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="text-balance text-[42px] font-semibold leading-[1.06] tracking-[-0.04em] text-foreground md:text-[72px]"
                data-testid="text-hero-title"
              >
                Your customers book, buy, and get help.
                <br />
                While you sleep.
                <span className="ilnaj-typing-cursor" aria-hidden />
              </motion.h1>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="mt-7 max-w-[46rem] text-pretty text-[18px] leading-relaxed text-muted-foreground md:text-[24px]"
                data-testid="text-hero-subtitle"
              >
                ILNAJ deploys intelligent conversational assistants on your website. Sales, appointments, and support
— automated with precision.
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.14, ease: [0.2, 0.8, 0.2, 1] }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Button
                  className="h-12 rounded-xl px-6"
                  onClick={() => scrollTo("device")}
                  data-testid="button-hero-primary"
                >
                  See it in action
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-primary text-primary hover:bg-primary/5"
                  onClick={() => scrollTo("cta")}
                  data-testid="button-hero-secondary"
                >
                  Talk to us
                </Button>
              </motion.div>

              <div className="mt-10 flex flex-wrap items-center gap-2 text-[12px] text-foreground/50">
                <span className="rounded-full bg-black/5 px-3 py-1.5" data-testid="badge-availability">
                  Available in continuous operation
                </span>
                <span className="rounded-full bg-black/5 px-3 py-1.5" data-testid="badge-multilingual">
                  Native multi-language
                </span>
                <span className="rounded-full bg-black/5 px-3 py-1.5" data-testid="badge-whitelabel">
                  Full white-label
                </span>
              </div>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16, rotateX: 14 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <MicroConversation />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </section>

      <section id="features" className="relative ilnaj-shadow-gradient-features">
        <FloatingShapes />
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[780px] text-center">
            <div className="text-[12px] font-semibold tracking-[0.18em] text-foreground/50" data-testid="text-features-kicker">
              HOW ILNAJ WORKS
            </div>
            <h2
              className="mt-4 text-balance text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-[48px]"
              data-testid="text-features-title"
            >
              Three business processes. One assistant.
            </h2>
            <p className="mt-5 text-pretty text-[18px] leading-relaxed text-muted-foreground" data-testid="text-features-subtitle">
              Designed for commerce, bookings, and support
— modular, brand-adaptive, and always on.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            <FeatureCard
              icon={<CreditCard className="h-6 w-6" aria-hidden />}
              title="Automated commerce"
              description="The assistant presents your catalog, checks real-time inventory, and generates Stripe payment links. Purchases complete without manual intervention."
              testId="card-feature-commerce"
              offset={-8}
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" aria-hidden />}
              title="Appointment management"
              description="Clients choose their time slot, the assistant syncs your calendar and sends confirmations. Works 24/7, including weekends."
              testId="card-feature-appointments"
              offset={0}
            />
            <FeatureCard
              icon={<MessageCircle className="h-6 w-6" aria-hidden />}
              title="Intelligent support"
              description="Answers FAQs based on your documentation and product details. Escalates to email or phone when human judgment is needed."
              testId="card-feature-support"
              offset={-8}
            />
          </div>
        </div>
      </section>

      <section id="integration" className="relative ilnaj-shadow-gradient-integration">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[860px] text-center">
            <div className="text-[12px] font-semibold tracking-[0.18em] text-foreground/50" data-testid="text-integration-kicker">
              TECHNICAL
            </div>
            <h2
              className="mt-4 text-balance text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-[48px]"
              data-testid="text-integration-title"
            >
              Invisible by design
            </h2>
            <p className="mt-5 text-pretty text-[18px] leading-relaxed text-muted-foreground" data-testid="text-integration-subtitle">
              ILNAJ integrates into your website with a single line of code. No conflicts, no complexity
— just a widget that works everywhere.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-[820px] flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-black/5 px-4 py-2 text-[13px] font-medium text-foreground/70" data-testid="badge-integration-1">
              30d Native multi-language
            </span>
            <span className="rounded-full bg-black/5 px-4 py-2 text-[13px] font-medium text-foreground/70" data-testid="badge-integration-2">
              3a8 Adapts to your brand
            </span>
            <span className="rounded-full bg-black/5 px-4 py-2 text-[13px] font-medium text-foreground/70" data-testid="badge-integration-3">
              261 Realistic typing effect
            </span>
          </div>

          <div className="mx-auto mt-12 max-w-[820px]">
            <div
              className="ilnaj-active-border rounded-2xl bg-[#111113] p-6 shadow-lg ring-1 ring-white/10"
              data-testid="card-code-mock"
            >
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-semibold tracking-[0.16em] text-white/50" data-testid="text-code-label">
                  INSTALLATION
                </div>
                <div className="text-[12px] text-white/40" data-testid="text-code-meta">
                  1 line
                </div>
              </div>
              <pre className="mt-4 overflow-auto rounded-xl bg-black/40 p-4 text-[13px] leading-relaxed text-emerald-300" data-testid="text-code">
{`<script src=\"https://ilnaj.ai/widget.js\"></script>
<!-- Installation complete -->`}
              </pre>
              <div className="mt-4 text-[13px] text-white/55" data-testid="text-code-caption">
                Compatible with all web environments.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="device" className="relative bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-6 md:col-start-2">
              <div className="text-[12px] font-semibold tracking-[0.18em] text-foreground/50" data-testid="text-device-kicker">
                PREVIEW
              </div>
              <h2
                className="mt-4 text-balance text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-[48px]"
                data-testid="text-device-title"
              >
                A live micro-conversation
— on a loop.
              </h2>
              <p className="mt-5 text-pretty text-[18px] leading-relaxed text-muted-foreground" data-testid="text-device-subtitle">
                Visitors understand the workflow in seconds: proactive help, structured intent, and a clear outcome.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-black/10 bg-white"
                  onClick={() => scrollTo("cta")}
                  data-testid="button-device-cta"
                >
                  Talk to us
                </Button>
                <Button className="h-12 rounded-xl px-6" onClick={() => scrollTo("steps")} data-testid="button-device-steps">
                  See setup steps
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 40, rotateX: 15 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                data-testid="device-mockup"
              >
                <MicroConversation />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="steps" className="relative bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[820px] text-center">
            <div className="text-[12px] font-semibold tracking-[0.18em] text-foreground/50" data-testid="text-steps-kicker">
              INSTALLATION
            </div>
            <h2
              className="mt-4 text-balance text-[34px] font-semibold leading-tight tracking-[-0.03em] md:text-[48px]"
              data-testid="text-steps-title"
            >
              From snippet to live assistant.
            </h2>
            <p className="mt-5 text-pretty text-[18px] leading-relaxed text-muted-foreground" data-testid="text-steps-subtitle">
              Four steps, designed to stay out of your way.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[1100px]">
            <div className="relative">
              <div className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-blue-500/0 md:block" aria-hidden />
              <div className="grid gap-6 md:grid-cols-4">
                {[
                  {
                    n: "1",
                    title: "Installation (2 min)",
                    desc: "Copy one line of code. Compatible with all web environments.",
                  },
                  {
                    n: "2",
                    title: "Business configuration (5 min)",
                    desc: "Enter your services, pricing, and availability. The assistant memorizes your catalog instantly.",
                  },
                  {
                    n: "3",
                    title: "Customization (3 min)",
                    desc: "Adjust colors, tone, and language to match your brand identity.",
                  },
                  {
                    n: "4",
                    title: "Go live (Immediate)",
                    desc: "The assistant starts processing requests, booking appointments, or closing sales.",
                  },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="ilnaj-active-border rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5"
                    data-testid={`card-step-${s.n}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-[14px] font-semibold text-white shadow-sm"
                        data-testid={`text-step-number-${s.n}`}
                      >
                        {s.n}
                      </div>
                      <div className="text-[16px] font-semibold tracking-[-0.01em]" data-testid={`text-step-title-${s.n}`}>
                        {s.title}
                      </div>
                    </div>
                    <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground" data-testid={`text-step-desc-${s.n}`}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="relative ilnaj-shadow-gradient-cta">
        <FloatingShapes />
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[980px] rounded-[32px] bg-white/70 p-10 shadow-md ring-1 ring-black/5 backdrop-blur md:p-14">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <div className="text-[12px] font-semibold tracking-[0.18em] text-foreground/50" data-testid="text-cta-kicker">
                  READY
                </div>
                <h2
                  className="mt-4 text-balance text-[32px] font-semibold leading-tight tracking-[-0.03em] md:text-[44px]"
                  data-testid="text-cta-title"
                >
                  Put a conversation layer
— on your site.
                </h2>
                <p className="mt-4 max-w-[44rem] text-pretty text-[16px] leading-relaxed text-muted-foreground" data-testid="text-cta-subtitle">
                  One assistant for commerce, bookings, and support. Modular, multilingual, and white-label.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button className="h-12 rounded-xl px-6" data-testid="button-cta-primary">
                  Talk to us
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-primary text-primary hover:bg-primary/5"
                  onClick={() => scrollTo("hero")}
                  data-testid="button-cta-secondary"
                >
                  Back to top
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/5 md:grid-cols-3">
              {[
                { label: "Deployment", value: "Single snippet" },
                { label: "Availability", value: "Continuous operation" },
                { label: "Branding", value: "Full white-label" },
              ].map((i) => (
                <div key={i.label} data-testid={`stat-${i.label.toLowerCase()}`}>
                  <div className="text-[12px] font-semibold tracking-[0.14em] text-foreground/50">{i.label}</div>
                  <div className="mt-2 text-[15px] font-semibold tracking-[-0.01em]">{i.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="ilnaj-footer-solid border-t border-black/5">
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="text-[14px] font-semibold tracking-[-0.02em]" data-testid="text-footer-brand">
                ILNAJ
              </div>
              <div className="mt-2 text-[13px] text-foreground/60" data-testid="text-footer-tagline">
                Conversational automation for commerce, bookings, and support.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-foreground/60">
              <a href="#features" className="hover:text-foreground" data-testid="link-footer-features">
                How it works
              </a>
              <a href="#integration" className="hover:text-foreground" data-testid="link-footer-integration">
                Integration
              </a>
              <a href="#steps" className="hover:text-foreground" data-testid="link-footer-steps">
                Steps
              </a>
              <a href="#cta" className="hover:text-foreground" data-testid="link-footer-cta">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-black/10 pt-6 text-[12px] text-foreground/50 md:flex-row md:items-center md:justify-between">
            <div data-testid="text-footer-copyright">
              9 {new Date().getFullYear()} ILNAJ. All rights reserved.
            </div>
            <div data-testid="text-footer-note">Prototype UI  a0 b7 a0 No backend connected</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
