import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, MessageCircle, Calendar, CreditCard, Users, TrendingUp, X, Send, Bot } from "lucide-react";

function LiveChatDemo({ lang }: { lang: "en" | "es" }) {
  const [messages, setMessages] = useState<{from: string; text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      { from: "ai", text: lang === "en" ? "Hi! How can I help you today?" : "¡Hola! ¿Cómo puedo ayudarte hoy?" },
      { from: "user", text: lang === "en" ? "I need to book an appointment" : "Necesito reservar una cita" },
      { from: "ai", text: lang === "en" ? "Of course! What day works for you?" : "¡Por supuesto! ¿Qué día te funciona?" },
      { from: "user", text: lang === "en" ? "Tomorrow at 3pm" : "Mañana a las 3pm" },
      { from: "ai", text: lang === "en" ? "Perfect! Let me confirm that..." : "¡Perfecto! Déjame confirmar..." },
    ];

    let currentStep = 0;
    const runSequence = () => {
      if (currentStep >= sequence.length) return;
      
      const msg = sequence[currentStep];
      setMessages(prev => [...prev, { from: msg.from, text: msg.text }]);
      
      if (msg.from === "ai" && currentStep < sequence.length - 1) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          currentStep++;
          runSequence();
        }, 1500);
      } else if (msg.from === "user") {
        currentStep++;
        setTimeout(runSequence, 500);
      } else {
        currentStep++;
      }
    };

    const timer = setTimeout(runSequence, 500);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="border-2 border-black bg-white">
        {/* Chat Header */}
        <div className="bg-black text-white px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black uppercase">AI Assistant</div>
            <div className="text-[10px] text-white/60">Online now</div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="p-4 space-y-3 min-h-[200px] max-h-[200px] overflow-hidden bg-gray-50">
          {messages.length === 0 && (
            <div className="text-center text-[10px] text-black/30 py-8">
              {lang === "en" ? "Starting conversation..." : "Iniciando conversación..."}
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs p-2 ${msg.from === "ai" ? "bg-black text-white" : "bg-gray-200 text-black ml-8"}`}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black text-white text-xs p-2 flex items-center gap-2"
            >
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </motion.div>
          )}
        </div>
        
        {/* Quick Replies */}
        {messages.length > 0 && messages[messages.length - 1].from === "ai" && (
          <div className="p-2 border-t border-black/10 flex gap-2 overflow-x-auto">
            <button className="text-[10px] bg-black text-white px-3 py-1.5 whitespace-nowrap font-medium">
              {lang === "en" ? "Book now" : "Reservar ahora"}
            </button>
            <button className="text-[10px] border border-black px-3 py-1.5 whitespace-nowrap font-medium">
              {lang === "en" ? "View slots" : "Ver horarios"}
            </button>
          </div>
        )}
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
      <div className="absolute inset-0 overflow-hidden">
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
                      crackito.uk — Your Website
                    </div>
                  </div>
                  <div className="w-12" />
                </div>

                {/* Website Content */}
                <div className="relative bg-white">
                  {/* Fake website */}
                  <div className="absolute inset-0 p-12 opacity-[0.04]">
                    <div className="flex items-center justify-between mb-12">
                      <div className="h-8 w-28 bg-black" />
                      <div className="flex gap-6">
                        <div className="h-3 w-16 bg-black" />
                        <div className="h-3 w-16 bg-black" />
                        <div className="h-3 w-16 bg-black" />
                      </div>
                    </div>
                    <div className="h-24 w-2/3 bg-black mb-6" />
                    <div className="space-y-2 mb-12">
                      <div className="h-4 w-full bg-black" />
                      <div className="h-4 w-full bg-black" />
                      <div className="h-4 w-3/4 bg-black" />
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-32 bg-black" />
                      ))}
                    </div>
                  </div>

                  {/* AI Widget Demo */}
                  <div className="relative z-10 p-8 min-h-[350px] flex items-end">
                    <LiveChatDemo lang={lang} />
                  </div>
                </div>
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
                <FeatureBadge icon={MessageCircle} text={lang === "en" ? "Chat Support" : "Soporte de Chat"} />
                <FeatureBadge icon={Calendar} text={lang === "en" ? "Book Appointments" : "Reservar Citas"} />
                <FeatureBadge icon={CreditCard} text={lang === "en" ? "Process Payments" : "Procesar Pagos"} />
                <FeatureBadge icon={Zap} text={lang === "en" ? "24/7 Available" : "24/7 Disponible"} />
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
