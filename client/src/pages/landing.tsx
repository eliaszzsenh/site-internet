import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, CreditCard, MessageCircle, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

type Lang = "en" | "es";

const translations = {
  en: {
    nav: {
      features: "How it works",
      integration: "Integration",
      steps: "Steps",
      talk: "Talk to us",
      action: "See it in action",
    },
    hero: {
      title: "Your customers book, buy, and get help. While you sleep.",
      subtitle: "ILNAJ deploys intelligent conversational assistants on your website. Sales, appointments, and support - automated with precision.",
      cta_primary: "See it in action",
      cta_secondary: "Talk to us",
      badge1: "Available in continuous operation",
      badge2: "Native multi-language",
      badge3: "Full white-label",
    },
    features: {
      kicker: "HOW ILNAJ WORKS",
      title: "Three business processes. One assistant.",
      subtitle: "Designed for commerce, bookings, and support - modular, brand-adaptive, and always on.",
      card1: {
        title: "Automated commerce",
        desc: "The assistant presents your catalog, checks real-time inventory, and generates Stripe payment links. Purchases complete without manual intervention.",
      },
      card2: {
        title: "Appointment management",
        desc: "Clients choose their time slot, the assistant syncs your calendar and sends confirmations. Works 24/7, including weekends.",
      },
      card3: {
        title: "Intelligent support",
        desc: "Answers FAQs based on your documentation and product details. Escalates to email or phone when human judgment is needed.",
      },
    },
    integration: {
      kicker: "TECHNICAL",
      title: "Invisible by design",
      subtitle: "ILNAJ integrates into your website with a single line of code. No conflicts, no complexity - just a widget that works everywhere.",
      badge1: "Native multi-language",
      badge2: "Adapts to your brand",
      badge3: "Realistic typing effect",
    },
    device: {
      kicker: "PREVIEW",
      title: "A live micro-conversation on a loop.",
      subtitle: "Visitors understand the workflow in seconds: proactive help, structured intent, and a clear outcome.",
      cta: "Talk to us",
      steps: "See setup steps",
    },
    steps: {
      kicker: "INSTALLATION",
      title: "From snippet to live assistant.",
      subtitle: "Four steps, designed to stay out of your way.",
      s1: { title: "Installation (2 min)", desc: "Copy one line of code. Compatible with all web environments." },
      s2: { title: "Business configuration (5 min)", desc: "Enter your services, pricing, and availability. The assistant memorizes your catalog instantly." },
      s3: { title: "Customization (3 min)", desc: "Adjust colors, tone, and language to match your brand identity." },
      s4: { title: "Go live (Immediate)", desc: "The assistant starts processing requests, booking appointments, or closing sales." },
    },
    cta: {
      kicker: "READY",
      title: "Put a conversation layer on your site.",
      subtitle: "One assistant for commerce, bookings, and support. Modular, multilingual, and white-label.",
      primary: "Talk to us",
      secondary: "Back to top",
    },
    chat: {
      assistant: "ILNAJ Assistant",
      online: "Online",
      proactive: "Need help booking an appointment?",
      user: "Yes, Tuesday at 3pm",
      ai_response: "Perfect! Booked for Feb 18 at 3:00 PM. Confirmation sent \u2713",
      minimized: "Booked \u2713",
      chat: "Chat",
    }
  },
  es: {
    nav: {
      features: "Cómo funciona",
      integration: "Integración",
      steps: "Pasos",
      talk: "Habla con nosotros",
      action: "Ver en acción",
    },
    hero: {
      title: "Sus clientes reservan, compran y reciben ayuda. Mientras duerme.",
      subtitle: "ILNAJ despliega asistentes conversacionales inteligentes en su sitio web. Ventas, citas y soporte - automatizados con precisión.",
      cta_primary: "Ver en acción",
      cta_secondary: "Habla con nosotros",
      badge1: "Disponible en funcionamiento continuo",
      badge2: "Multilingüe nativo",
      badge3: "Marca blanca completa",
    },
    features: {
      kicker: "CÓMO FUNCIONA ILNAJ",
      title: "Tres procesos de negocio. Un asistente.",
      subtitle: "Diseñado para el comercio, las reservas y el soporte - modular, adaptable a la marca y siempre activo.",
      card1: {
        title: "Comercio automatizado",
        desc: "El asistente presenta su catálogo, verifica el inventario en tiempo real y genera enlaces de pago de Stripe. Las compras se completan sin intervención manual.",
      },
      card2: {
        title: "Gestión de citas",
        desc: "Los clientes eligen su franja horaria, el asistente sincroniza su calendario y envía confirmaciones. Funciona 24/7, incluso fines de semana.",
      },
      card3: {
        title: "Soporte inteligente",
        desc: "Responde preguntas frecuentes basadas en su documentación y detalles del producto. Escala a correo o teléfono cuando se necesita juicio humano.",
      },
    },
    integration: {
      kicker: "TÉCNICO",
      title: "Invisible por diseño",
      subtitle: "ILNAJ se integra en su sitio web con una sola línea de código. Sin conflictos, sin complejidad - solo un widget que funciona en todas partes.",
      badge1: "Multilingüe nativo",
      badge2: "Se adapta a su marca",
      badge3: "Efecto de escritura realista",
    },
    device: {
      kicker: "VISTA PREVIA",
      title: "Una micro-conversación en vivo en bucle.",
      subtitle: "Los visitantes entienden el flujo en segundos: ayuda proactiva, intención estructurada y un resultado claro.",
      cta: "Habla con nosotros",
      steps: "Ver pasos de configuración",
    },
    steps: {
      kicker: "INSTALACIÓN",
      title: "De un fragmento a un asistente en vivo.",
      subtitle: "Cuatro pasos, diseñados para no estorbar.",
      s1: { title: "Instalación (2 min)", desc: "Copie una línea de código. Compatible con todos los entornos web." },
      s2: { title: "Configuración de negocio (5 min)", desc: "Ingrese sus servicios, precios y disponibilidad. El asistente memoriza su catálogo al instante." },
      s3: { title: "Personalización (3 min)", desc: "Ajuste colores, tono e idioma para que coincidan con su identidad de marca." },
      s4: { title: "Puesta en marcha (Inmediata)", desc: "El asistente comienza a procesar solicitudes, reservar citas o cerrar ventas." },
    },
    cta: {
      kicker: "LISTO",
      title: "Ponga una capa de conversación en su sitio.",
      subtitle: "Un asistente para comercio, reservas y soporte. Modular, multilingüe y marca blanca.",
      primary: "Habla con nosotros",
      secondary: "Volver arriba",
    },
    chat: {
      assistant: "Asistente ILNAJ",
      online: "En línea",
      proactive: "¿Necesita ayuda para reservar una cita?",
      user: "Sí, el martes a las 15:00",
      ai_response: "¡Perfecto! Reservado para el 18 de febrero a las 15:00. Confirmación enviada \u2713",
      minimized: "Reservado \u2713",
      chat: "Chat",
    }
  }
};

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

function MicroConversation({ lang }: { lang: Lang }) {
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
      <div className="rounded-[44px] border border-black bg-white shadow-xl">
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

export default function Landing() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];
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
  }, [lang]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const toggleLang = () => setLang((prev) => (prev === "en" ? "es" : "en"));

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <header className="sticky top-0 z-50 border-b border-black bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <div className="flex items-center gap-2" data-testid="text-brand">
            <div className="h-8 w-8 bg-black" aria-hidden />
            <div className="text-[16px] font-black tracking-tighter uppercase">ILNAJ</div>
          </div>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            <button
              className="text-[13px] font-bold uppercase tracking-wider transition-colors hover:underline"
              onClick={() => scrollTo("features")}
            >
              {t.nav.features}
            </button>
            <button
              className="text-[13px] font-bold uppercase tracking-wider transition-colors hover:underline"
              onClick={() => scrollTo("integration")}
            >
              {t.nav.integration}
            </button>
            <button
              className="text-[13px] font-bold uppercase tracking-wider transition-colors hover:underline"
              onClick={() => scrollTo("steps")}
            >
              {t.nav.steps}
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLang}
              className="h-8 rounded-none border-black font-bold uppercase tracking-tighter"
            >
              <Globe className="mr-2 h-3.5 w-3.5" />
              {lang === "en" ? "ES" : "EN"}
            </Button>
            <Button
              className="h-10 rounded-none bg-black px-6 font-bold uppercase tracking-widest text-white hover:bg-black/90"
              onClick={() => scrollTo("device")}
            >
              {t.nav.action}
            </Button>
          </div>
        </div>
      </header>

      <section id="hero" className="relative ilnaj-shadow-gradient-hero overflow-hidden">
        <FloatingShapes />
        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-28 md:pb-28 md:pt-40">
          <div className="grid items-center gap-14 md:grid-cols-12">
            <div className="md:col-span-7 md:col-start-2 relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-balance text-[42px] font-black leading-[1.05] tracking-tighter md:text-[80px] uppercase"
              >
                {t.hero.title}
                <span className="ilnaj-typing-cursor" aria-hidden />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-8 max-w-[44rem] text-[18px] font-medium leading-relaxed text-black/70 md:text-[22px]"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Button
                  className="h-14 rounded-none bg-black px-10 text-[15px] font-black uppercase tracking-widest text-white hover:bg-black/90"
                  onClick={() => scrollTo("device")}
                >
                  {t.hero.cta_primary}
                </Button>
                <Button
                  variant="outline"
                  className="h-14 rounded-none border-2 border-black bg-transparent px-10 text-[15px] font-black uppercase tracking-widest text-black hover:bg-black/5"
                  onClick={() => scrollTo("cta")}
                >
                  {t.hero.cta_secondary}
                </Button>
              </motion.div>

              <div className="mt-12 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black/40">
                <span className="border border-black/10 px-3 py-1">{t.hero.badge1}</span>
                <span className="border border-black/10 px-3 py-1">{t.hero.badge2}</span>
                <span className="border border-black/10 px-3 py-1">{t.hero.badge3}</span>
              </div>
            </div>

            <div className="md:col-span-4 md:col-start-9 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <MicroConversation lang={lang} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative ilnaj-shadow-gradient-features">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[800px] text-center">
            <div className="text-[13px] font-black tracking-[0.25em] text-black/40 uppercase">
              {t.features.kicker}
            </div>
            <h2 className="mt-6 text-[34px] font-black leading-tight tracking-tighter md:text-[56px] uppercase">
              {t.features.title}
            </h2>
            <p className="mt-6 text-[18px] font-medium text-black/60">
              {t.features.subtitle}
            </p>
          </div>

          <div className="mt-16 grid gap-0 md:grid-cols-3">
            <FeatureCard
              icon={<CreditCard className="h-6 w-6" />}
              title={t.features.card1.title}
              description={t.features.card1.desc}
              testId="card-feature-commerce"
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title={t.features.card2.title}
              description={t.features.card2.desc}
              testId="card-feature-appointments"
            />
            <FeatureCard
              icon={<MessageCircle className="h-6 w-6" />}
              title={t.features.card3.title}
              description={t.features.card3.desc}
              testId="card-feature-support"
            />
          </div>
        </div>
      </section>

      <section id="integration" className="relative ilnaj-shadow-gradient-integration">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[860px] text-center">
            <div className="text-[13px] font-black tracking-[0.25em] text-black/40 uppercase">
              {t.integration.kicker}
            </div>
            <h2 className="mt-6 text-[34px] font-black leading-tight tracking-tighter md:text-[56px] uppercase">
              {t.integration.title}
            </h2>
            <p className="mt-6 text-[18px] font-medium text-black/60">
              {t.integration.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-[820px] flex-wrap items-center justify-center gap-3">
            {[t.integration.badge1, t.integration.badge2, t.integration.badge3].map((b, i) => (
              <span key={i} className="border border-black px-4 py-2 text-[12px] font-black uppercase tracking-widest">
                {b}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-[820px]">
            <div className="rounded-none bg-black p-8 shadow-2xl">
              <pre className="overflow-auto text-[14px] font-mono leading-relaxed text-white">
{`<script src=\"https://ilnaj.ai/widget.js\"></script>
<!-- Installation complete -->`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section id="device" className="relative bg-white border-y border-black">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-6 md:col-start-2">
              <div className="text-[13px] font-black tracking-[0.25em] text-black/40 uppercase">
                {t.device.kicker}
              </div>
              <h2 className="mt-6 text-[34px] font-black leading-tight tracking-tighter md:text-[56px] uppercase">
                {t.device.title}
              </h2>
              <p className="mt-6 text-[18px] font-medium text-black/60">
                {t.device.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  className="h-12 rounded-none bg-black px-8 font-black uppercase tracking-widest text-white"
                  onClick={() => scrollTo("cta")}
                >
                  {t.device.cta}
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-none border-2 border-black font-black uppercase tracking-widest text-black"
                  onClick={() => scrollTo("steps")}
                >
                  {t.device.steps}
                </Button>
              </div>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <MicroConversation lang={lang} />
            </div>
          </div>
        </div>
      </section>

      <section id="steps" className="relative bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[820px] text-center">
            <div className="text-[13px] font-black tracking-[0.25em] text-black/40 uppercase">
              {t.steps.kicker}
            </div>
            <h2 className="mt-6 text-[34px] font-black leading-tight tracking-tighter md:text-[56px] uppercase">
              {t.steps.title}
            </h2>
            <p className="mt-6 text-[18px] font-medium text-black/60">
              {t.steps.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-[1100px]">
            <div className="grid gap-0 md:grid-cols-4">
              {[t.steps.s1, t.steps.s2, t.steps.s3, t.steps.s4].map((s, i) => (
                <div key={i} className="border border-black p-8 bg-white transition-colors hover:bg-black hover:text-white group">
                  <div className="text-[48px] font-black tracking-tighter group-hover:text-white/20 text-black/10 leading-none">
                    0{i + 1}
                  </div>
                  <div className="mt-6 text-[16px] font-black uppercase tracking-tighter">
                    {s.title}
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed opacity-70">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="relative border-t border-black bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="border-[4px] border-black p-10 md:p-16">
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
              <div>
                <div className="text-[13px] font-black tracking-[0.25em] text-black/40 uppercase">
                  {t.cta.kicker}
                </div>
                <h2 className="mt-6 text-[32px] font-black leading-tight tracking-tighter md:text-[56px] uppercase">
                  {t.cta.title}
                </h2>
                <p className="mt-6 max-w-[40rem] text-[18px] font-medium text-black/60">
                  {t.cta.subtitle}
                </p>
              </div>

              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                <Button className="h-16 rounded-none bg-black px-10 text-[16px] font-black uppercase tracking-widest text-white">
                  {t.cta.primary}
                </Button>
                <Button
                  variant="outline"
                  className="h-16 rounded-none border-2 border-black font-black uppercase tracking-widest"
                  onClick={() => scrollTo("hero")}
                >
                  {t.cta.secondary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div>
              <div className="text-[24px] font-black tracking-tighter uppercase">ILNAJ</div>
              <p className="mt-4 text-[14px] font-medium text-black/50 max-w-[300px]">
                Conversational automation for commerce, bookings, and support.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-[13px] font-black uppercase tracking-widest">
              <button onClick={() => scrollTo("features")} className="hover:underline text-left">{t.nav.features}</button>
              <button onClick={() => scrollTo("integration")} className="hover:underline text-left">{t.nav.integration}</button>
              <button onClick={() => scrollTo("steps")} className="hover:underline text-left">{t.nav.steps}</button>
              <button onClick={() => scrollTo("cta")} className="hover:underline text-left">Contact</button>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-black pt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 md:flex-row md:items-center md:justify-between">
            <div>
              © {new Date().getFullYear()} ILNAJ. All rights reserved.
            </div>
            <div>
              Prototype UI — No backend connected
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
