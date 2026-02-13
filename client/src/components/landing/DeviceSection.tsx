import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, MessageCircle, Calendar, CreditCard, Users, TrendingUp, X, Send, Bot, Coffee, Check } from "lucide-react";

function AnimatedCursor() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0.8],
        x: [0, 180, 180, 180],
        y: [0, 280, 280, 280]
      }}
      transition={{ duration: 2.5, times: [0, 0.1, 0.15, 1] }}
      className="absolute pointer-events-none z-50"
      style={{ top: 100, left: 100 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5.5 3.21V20.79C5.5 21.3 6.12 21.58 6.52 21.24L11.08 17.47C11.51 17.13 12.12 17.13 12.54 17.47L18.48 22.24C18.89 22.58 19.5 22.3 19.5 21.79V5.21C19.5 4.7 18.88 4.42 18.48 4.76L12.54 1.24C12.12 1.58 11.51 1.58 11.08 1.24L5.5 4.76C5.1 5.1 4.5 4.82 4.5 4.31" stroke="black" strokeWidth="1.5" fill="white"/>
      </svg>
    </motion.div>
  );
}

function CoffeeChatDemo({ lang }: { lang: "en" | "es" }) {
  const [stage, setStage] = useState<"idle" | "clicking" | "opening" | "greeting" | "recommending" | "selecting" | "processing" | "payment">("idle");
  const [messages, setMessages] = useState<{from: "ai" | "user"; text: string; options?: string[]}[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Stage 1: Clicking (0-2s)
      await new Promise(r => setTimeout(r, 500));
      setStage("clicking");
      await new Promise(r => setTimeout(r, 2000));
      
      // Stage 2: Opening (2-3s)
      setShowCursor(false);
      setWidgetOpen(true);
      setStage("opening");
      await new Promise(r => setTimeout(r, 800));
      
      // Stage 3: Greeting (3-5s)
      setStage("greeting");
      setMessages([{ from: "ai", text: lang === "en" ? "Hi! What can I get you today?" : "¡Hola! ¿Qué te puedo ofrecer hoy?" }]);
      await new Promise(r => setTimeout(r, 2000));
      
      // Stage 4: User asks (5-6s)
      setMessages([...messages, { from: "user", text: lang === "en" ? "Can I get a coffee recommendation?" : "¿Me puedes recomendar un café?" }]);
      await new Promise(r => setTimeout(r, 1500));
      
      // Stage 5: AI Recommending (6-9s)
      setStage("recommending");
      setMessages(prev => [...prev, { 
        from: "ai", 
        text: lang === "en" ? "Of course! Here are our specials:" : "¡Por supuesto! Estas son nuestras especialidades:",
        options: lang === "en" ? ["☕ Espresso", "🥛 Latte", "🍵 Matcha Latte", "🍪 Cookie Latte"] : ["☕ Espresso", "🥛 Latte", "🍵 Latte Matcha", "🍪 Latte de Galleta"]
      }]);
      await new Promise(r => setTimeout(r, 3000));
      
      // Stage 6: User selecting (9-10s)
      setStage("selecting");
      setSelectedOption(lang === "en" ? "Matcha Latte" : "Latte Matcha");
      await new Promise(r => setTimeout(r, 1500));
      
      // Stage 7: Processing (10-12s)
      setStage("processing");
      setMessages(prev => [...prev, { from: "ai", text: lang === "en" ? "Great choice! One Matcha Latte coming up!" : "¡Excelente elección! ¡Un Latte Matcha en camino!" }]);
      await new Promise(r => setTimeout(r, 2000));
      
      // Stage 8: Payment (12s+)
      setStage("payment");
      setShowPayment(true);
    };

    sequence();
  }, [lang]);

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Cursor Animation */}
      <AnimatePresence>
        {stage === "clicking" && <AnimatedCursor />}
      </AnimatePresence>

      {/* Website Fake Content */}
      <div className="relative bg-white" style={{ minHeight: "320px" }}>
        {/* Fake website */}
        <div className="absolute inset-0 p-6 opacity-[0.05]">
          <div className="flex items-center justify-between mb-8">
            <div className="h-6 w-20 bg-black" />
            <div className="flex gap-4">
              <div className="h-2 w-12 bg-black" />
              <div className="h-2 w-12 bg-black" />
            </div>
          </div>
          <div className="h-16 w-2/3 bg-black mb-4" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-black" />
            <div className="h-3 w-3/4 bg-black" />
          </div>
        </div>

        {/* Chat Widget Button (when closed) */}
        {!widgetOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
            style={{ bottom: 24, right: 24 }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}

        {/* Chat Widget (when open) */}
        <AnimatePresence>
          {widgetOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 right-6 w-80 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              style={{ bottom: 24, right: 24 }}
            >
              {/* Header */}
              <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase">AI Assistant</div>
                    <div className="text-[10px] text-white/60 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </div>
                  </div>
                </div>
                <button className="text-white/60 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 min-h-[180px] max-h-[180px] overflow-y-auto bg-gray-50">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-xs ${msg.from === "ai" ? "" : "ml-8"}`}
                  >
                    <div className={`p-2 ${msg.from === "ai" ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
                      {msg.text}
                    </div>
                    {/* Options */}
                    {msg.options && (
                      <div className="mt-2 space-y-1">
                        {msg.options.map((opt, j) => (
                          <motion.button
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.1 }}
                            className="w-full text-left text-xs p-2 border border-black hover:bg-black hover:text-white transition-colors"
                            onClick={() => setSelectedOption(opt)}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Processing indicator */}
                {stage === "processing" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-black text-white text-xs p-2"
                  >
                    <span className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <span 
                          key={i} 
                          className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" 
                          style={{ animationDelay: `${i * 150}ms` }} 
                        />
                      ))}
                    </span>
                  </motion.div>
                )}

                {/* Payment Button */}
                <AnimatePresence>
                  {showPayment && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <div className="border-2 border-black p-3 bg-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee className="w-4 h-4" />
                          <span className="text-xs font-black">{selectedOption}</span>
                          <span className="ml-auto text-xs font-bold">$5.50</span>
                        </div>
                        <button className="w-full bg-black text-white text-xs font-black py-2 flex items-center justify-center gap-2 hover:bg-gray-800">
                          <CreditCard className="w-3 h-3" />
                          PAY NOW
                        </button>
                        <div className="text-[8px] text-center text-black/40 mt-1">
                          Powered by Stripe
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input */}
              {stage !== "payment" && (
                <div className="border-t-2 border-black p-2 flex gap-2">
                  <input 
                    type="text" 
                    placeholder={lang === "en" ? "Type a message..." : "Escribe un mensaje..."}
                    className="flex-1 text-xs border border-black px-3 py-2 outline-none"
                    disabled
                  />
                  <button className="w-8 h-8 bg-black text-white flex items-center justify-center">
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeatureBadge({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs font-black uppercase tracking-wide">{text}</span>
    </motion.div>
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-black tracking-tighter">{value}</div>
      <div className="text-xs font-medium text-black/50 uppercase tracking-widest mt-1">{label}</div>
    </motion.div>
  );
}

export default function DeviceSection({ 
  t, 
  lang, 
  scrollTo 
}: { 
  t: any; 
  lang: "en" | "es"; 
  scrollTo: (id: string) => void 
}) {
  return (
    <section id="device" className="relative bg-white border-y border-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 border-2 border-black/5 rotate-12" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border-2 border-black/5 -rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/3 rounded-full" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-[13px] font-black tracking-[0.25em] text-black/40 uppercase">
            {t.device.kicker}
          </div>
          <h2 className="mt-6 text-[34px] font-black leading-tight tracking-tighter md:text-[64px] uppercase max-w-4xl mx-auto">
            {t.device.title}
          </h2>
          <p className="mt-6 text-[18px] font-medium text-black/60 max-w-2xl mx-auto">
            Your AI assistant adapts instantly to the environment. Whether it's a mobile viewport or a high-resolution desktop screen, the performance remains sharp and the logic consistent.
          </p>
        </motion.div>

        {/* Main Demo Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left: Browser with Chat */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Browser Frame */}
              <div className="border-[3px] border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                {/* Browser Header */}
                <div className="flex items-center justify-between border-b-[3px] border-black bg-white px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-4 w-4 rounded-full bg-black" />
                    <div className="h-4 w-4 rounded-full bg-black" />
                    <div className="h-4 w-4 rounded-full bg-black" />
                  </div>
                  <div className="flex-1 max-w-md mx-8">
                    <div className="h-8 border-2 border-black bg-gray-50 flex items-center px-4 text-[11px] font-black uppercase tracking-widest text-black/40">
                      yourwebsite.com — Coffee Shop Demo
                    </div>
                  </div>
                  <div className="w-12" />
                </div>

                {/* Website Content with Chat Demo */}
                <CoffeeChatDemo lang={lang} />
              </div>
            </motion.div>
          </div>

          {/* Right: Features & Stats */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-black uppercase tracking-tight">
                {lang === "en" ? "What it can do" : "Lo que puede hacer"}
              </h3>
              
              <div className="space-y-3">
                <FeatureBadge icon={MessageCircle} text={lang === "en" ? "Natural Chat" : "Chat Natural"} />
                <FeatureBadge icon={Coffee} text={lang === "en" ? "Product Recs" : "Recomendaciones"} />
                <FeatureBadge icon={Calendar} text={lang === "en" ? "Book Orders" : "Reservas"} />
                <FeatureBadge icon={CreditCard} text={lang === "en" ? "Instant Payments" : "Pagos Instant"} />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="grid grid-cols-2 gap-8">
                <StatCard value="24/7" label={lang === "en" ? "Active" : "Activo"} delay={0} />
                <StatCard value="−80%" label={lang === "en" ? "Workload" : "Carga"} delay={0.1} />
                <StatCard value="+40%" label={lang === "en" ? "Leads" : "Leads"} delay={0.2} />
                <StatCard value="2s" label={lang === "en" ? "Response" : "Respuesta"} delay={0.3} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-4">
            <Button
              className="h-16 px-12 rounded-none bg-black text-[16px] font-black uppercase tracking-widest text-white hover:bg-black/90 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-1 hover:translate-y-1"
              onClick={() => scrollTo("cta")}
            >
              {t.device.cta} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="h-16 px-12 rounded-none border-2 border-black text-[16px] font-black uppercase tracking-widest text-black hover:bg-black/10 transition-all"
              onClick={() => scrollTo("steps")}
            >
              {t.device.steps}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
