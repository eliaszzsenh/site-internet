import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, MessageCircle, Calendar, CreditCard, Bot, Coffee, Check, CalendarCheck } from "lucide-react";

function BookingChatDemo({ lang }: { lang: "en" | "es" }) {
  const [messages, setMessages] = useState<{from: "ai" | "user"; text: string; options?: string[]; showOptions?: boolean}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const sequence = [
      // Step 0: AI greeting
      { from: "ai", text: lang === "en" ? "Hi! How can I help you today?" : "¡Hola! ¿Cómo puedo ayudarte hoy?", delay: 500 },
      // Step 1: User wants appointment
      { from: "user", text: lang === "en" ? "I need to book an appointment" : "Necesito reservar una cita", delay: 2000 },
      // Step 2: AI asks what service
      { from: "ai", text: lang === "en" ? "Sure! What service are you interested in?" : "¡Por supuesto! ¿Qué servicio te interesa?", delay: 1500, showOptions: true, options: lang === "en" ? ["💅 Manicure", "💆 Massage", "🦷 Dental Checkup"] : ["💅 Manicure", "💆 Masaje", "🦷 Revisión Dental"] },
      // Step 3: User selects service
      { from: "user", text: lang === "en" ? "Dental Checkup please" : "Revisión Dental por favor", delay: 3000 },
      // Step 4: AI asks for date preference
      { from: "ai", text: lang === "en" ? "Great choice! What day works best for you?" : "¡Excelente! ¿Qué día te funciona mejor?", delay: 2000 },
      // Step 5: User provides date
      { from: "user", text: lang === "en" ? "This Tuesday if possible" : "Este martes si es posible", delay: 2000 },
      // Step 6: AI asks for time
      { from: "ai", text: lang === "en" ? "Perfect! What time would you prefer?" : "¡Perfect! ¿Qué horario te gustaría?", delay: 2000 },
      // Step 7: User provides time
      { from: "user", text: lang === "en" ? "Around 3pm if available" : "Alrededor de las 3pm si está disponible", delay: 2000 },
      // Step 8: AI asks for contact info
      { from: "ai", text: lang === "en" ? "Perfect! Could I get your name and email for the confirmation?" : "¡Perfecto! ¿Me podrías dar tu nombre y email para la confirmación?", delay: 2000 },
      // Step 9: User provides contact
      { from: "user", text: lang === "en" ? "Sure! It's John, john@email.com" : "¡Claro! Soy Juan, juan@email.com", delay: 2000 },
      // Step 10: AI confirms
      { from: "ai", text: lang === "en" ? "Perfect! I've booked your dental checkup for Tuesday at 3:00 PM. A confirmation has been sent to john@email.com. See you then! ✓" : "¡Perfecto! He reservado tu revisión dental para el martes a las 3:00 PM. Se ha enviado una confirmación a juan@email.com. ¡Nos vemos entonces! ✓", delay: 2000 },
    ];

    let currentStep = 0;
    
    const runSequence = () => {
      if (currentStep >= sequence.length) return;
      
      const msg = sequence[currentStep];
      setIsTyping(msg.from === "ai");
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          from: msg.from as "ai" | "user", 
          text: msg.text,
          options: msg.options,
          showOptions: msg.showOptions
        }]);
        
        currentStep++;
        if (currentStep < sequence.length) {
          runSequence();
        }
      }, msg.delay);
    };

    runSequence();

    return () => {
      currentStep = sequence.length;
    };
  }, [lang]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="border-2 border-black bg-white">
        {/* Chat Header */}
        <div className="bg-black text-white px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black uppercase">Booking Assistant</div>
            <div className="text-[10px] text-white/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Online
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="p-4 space-y-3 min-h-[220px] max-h-[220px] overflow-y-auto bg-gray-50">
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
                      className="w-full text-left text-[10px] p-2 border border-black hover:bg-black hover:text-white transition-colors"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black text-white text-xs p-2 flex items-center gap-2 w-fit"
            >
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </motion.div>
          )}
        </div>
        
        {/* Input */}
        <div className="border-t-2 border-black p-2">
          <input 
            type="text" 
            placeholder={lang === "en" ? "Type a message..." : "Escribe un mensaje..."}
            className="w-full text-xs border border-black px-3 py-2 outline-none bg-white"
            disabled
          />
        </div>
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
                      yourwebsite.com — Booking Demo
                    </div>
                  </div>
                  <div className="w-12" />
                </div>

                {/* Website Content with Chat Demo */}
                <div className="relative bg-white p-8 min-h-[350px] flex items-center">
                  {/* Fake website behind */}
                  <div className="absolute inset-0 p-6 opacity-[0.04] pointer-events-none">
                    <div className="flex items-center justify-between mb-8">
                      <div className="h-6 w-24 bg-black" />
                      <div className="flex gap-4">
                        <div className="h-2 w-16 bg-black" />
                        <div className="h-2 w-16 bg-black" />
                      </div>
                    </div>
                    <div className="h-20 w-2/3 bg-black mb-4" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-black" />
                      <div className="h-4 w-3/4 bg-black" />
                    </div>
                  </div>
                  
                  {/* Chat Demo */}
                  <div className="relative z-10 w-full">
                    <BookingChatDemo lang={lang} />
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
                <FeatureBadge icon={MessageCircle} text={lang === "en" ? "Natural Chat" : "Chat Natural"} />
                <FeatureBadge icon={Calendar} text={lang === "en" ? "Smart Booking" : "Reservas Intelig"} />
                <FeatureBadge icon={CreditCard} text={lang === "en" ? "Instant Payments" : "Pagos Instant"} />
                <FeatureBadge icon={Bot} text={lang === "en" ? "24/7 Available" : "24/7 Disponible"} />
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
