import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { CreditCard, Calendar, MessageCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingShapes } from "@/components/landing/FloatingShapes";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { MicroConversation } from "@/components/landing/MicroConversation";
import { WebsitePreview } from "@/components/landing/WebsitePreview";
import { ContactForm } from "@/components/landing/ContactForm";
import { BrowserFrame } from "@/components/landing/BrowserFrame";
import { IntegrationGrid } from "@/components/landing/IntegrationGrid";
import { MarqueeTicker } from "@/components/landing/MarqueeTicker";
import { translations, Lang } from "@/lib/i18n";

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
            <Link href="/eliasz">
              <a className="text-[13px] font-bold uppercase tracking-wider transition-colors hover:underline">
                ELIASZ
              </a>
            </Link>
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

      <section id="hero" className="relative ilnaj-shadow-gradient-hero overflow-hidden ilnaj-noise">
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
                className="mt-10"
              >
                 <WebsitePreview />
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

          <IntegrationGrid />

          <div className="mx-auto mt-24 max-w-[820px]">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 mb-4 ml-2">
              Developer Installation
            </div>
            <div className="rounded-none bg-black p-8 shadow-2xl">
              <pre className="overflow-auto text-[14px] font-mono leading-relaxed text-white">
{`<script src=\"https://ilnaj.ai/widget.js\"></script>
<!-- Installation complete -->`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section id="device" className="relative bg-white border-y border-black ilnaj-noise overflow-hidden">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden xl:block">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">
                AUTOMATION ENGINE v1.0.4 ■ EST. 2024 ■ ALL RIGHTS RESERVED
            </div>
        </div>

        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <div className="grid items-center gap-20 md:grid-cols-12">
            <div className="md:col-span-6 md:col-start-2">
              <div className="text-[13px] font-black tracking-[0.25em] text-black/40 uppercase">
                {t.device.kicker}
              </div>
              <h2 className="mt-6 text-[34px] font-black leading-tight tracking-tighter md:text-[56px] uppercase">
                {t.device.title}
              </h2>
              <p className="mt-6 text-[18px] font-medium text-black/60 max-w-lg">
                Your AI assistant adapts instantly to the environment. Whether it's a mobile viewport or a high-resolution desktop screen, the performance remains sharp and the logic consistent.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  className="h-14 rounded-none bg-black px-10 font-black uppercase tracking-widest text-white hover:bg-black/90 transition-all"
                  onClick={() => scrollTo("cta")}
                >
                  {t.device.cta}
                </Button>
                <Button
                  variant="outline"
                  className="h-14 rounded-none border-2 border-black font-black uppercase tracking-widest text-black hover:bg-black/10 transition-all"
                  onClick={() => scrollTo("steps")}
                >
                  {t.device.steps}
                </Button>
              </div>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <BrowserFrame>
                <div className="scale-[0.8] origin-bottom-right">
                   <MicroConversation lang={lang} />
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>
      </section>

      <section id="steps" className="relative bg-white ilnaj-noise">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
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
            <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
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

              <div className="w-full lg:max-w-md">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeTicker />

      <footer className="border-t border-black bg-white ilnaj-noise">
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
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
              <div>
                © {new Date().getFullYear()} ILNAJ. All rights reserved.
              </div>
              <Link href="/terms">
                <a className="hover:text-black transition-colors">Terms of Service</a>
              </Link>
              <Link href="/privacy">
                <a className="hover:text-black transition-colors">Privacy Policy</a>
              </Link>
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
