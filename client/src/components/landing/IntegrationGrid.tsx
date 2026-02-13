import { motion } from "framer-motion";
import { 
  CreditCard, 
  Calendar, 
  Table, 
  Layers, 
  Send, 
  MessageSquare, 
  Zap, 
  Cloud 
} from "lucide-react";

const integrations = [
  { name: "Stripe", icon: <CreditCard className="h-8 w-8" />, category: "Payments" },
  { name: "Google Calendar", icon: <Calendar className="h-8 w-8" />, category: "Booking" },
  { name: "Google Sheets", icon: <Table className="h-8 w-8" />, category: "CRM / Data" },
  { name: "n8n", icon: <Zap className="h-8 w-8" />, category: "Automation" },
  { name: "Telegram", icon: <Send className="h-8 w-8" />, category: "Channels" },
  { name: "WhatsApp", icon: <MessageSquare className="h-8 w-8" />, category: "Support" },
  { name: "Airtable", icon: <Layers className="h-8 w-8" />, category: "Database" },
  { name: "Webhooks", icon: <Cloud className="h-8 w-8" />, category: "Custom" },
];

export function IntegrationGrid() {
  return (
    <div className="mx-auto mt-20 max-w-[1100px]">
      <div className="grid grid-cols-2 gap-px bg-black border border-black md:grid-cols-4 lg:grid-cols-4">
        {integrations.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-white p-10 flex flex-col items-center justify-center text-center transition-colors hover:bg-black"
          >
            <div className="text-black group-hover:text-white transition-colors duration-300">
              {item.icon}
            </div>
            <div className="mt-4 text-[13px] font-black uppercase tracking-widest text-black group-hover:text-white">
              {item.name}
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-black/40 group-hover:text-white/40">
              {item.category}
            </div>
            
            {/* Absolute corner ornament */}
            <div className="absolute top-2 right-2 h-1.5 w-1.5 bg-black group-hover:bg-white transition-colors" />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-[12px] font-black uppercase tracking-[0.3em] text-black/30">
          + 50 MORE VIA CUSTOM API WEBHOOKS
        </p>
      </div>
    </div>
  );
}
