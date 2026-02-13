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
  { 
    name: "Stripe", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.962 8.196c0-2.43-1.127-3.626-3.14-3.626-1.026 0-1.745.244-2.22.457l-.372-2.128c.575-.274 1.637-.62 3.1-.62 3.6 0 5.414 1.956 5.414 5.378 0 4.195-3.666 5.253-5.32 5.727-1.464.42-2.1.8-2.1 1.743 0 .864.712 1.34 1.83 1.34 1.254 0 2.2-.426 2.766-.757l.386 2.164c-.66.425-1.928.914-3.627.914-3.6 0-5.467-1.973-5.467-5.343 0-3.65 2.9-5.1 5.35-5.83 1.488-.445 2.4-.874 2.4-1.918z" />
      </svg>
    ), 
    category: "Payments" 
  },
  { 
    name: "Google Calendar", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/>
      </svg>
    ), 
    category: "Booking" 
  },
  { 
    name: "n8n", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ), 
    category: "Automation" 
  },
  { 
    name: "Telegram", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.79 5.42-1.12 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.36-.48.99-.73 3.84-1.67 6.39-2.77 7.64-3.3 3.64-1.53 4.4-.1.4.3z" />
      </svg>
    ), 
    category: "Channels" 
  },
  { 
    name: "WhatsApp", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.032-5.396 12.035-12.031.002-3.215-1.248-6.237-3.527-8.514z" />
      </svg>
    ), 
    category: "Channels" 
  },
  { 
    name: "Zapier", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 4.8l-4.8 7.2h3.6V19.2l4.8-7.2h-3.6V4.8z" />
      </svg>
    ), 
    category: "Automation" 
  },
  { 
    name: "Google Sheets", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm1 11h-2v2h2v-2zm0-4h-2v2h2V9zm-4 4H9v2h2v-2zm0-4H9v2h2V9zm1-5l5 5h-5V4z" />
      </svg>
    ), 
    category: "CRM / Data" 
  },
  { 
    name: "Webhooks", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.44a1 1 0 01-1 0l-7.97-4.44A1.002 1.002 0 013 16.5v-9c0-.38.21-.71.53-.88l7.97-4.44a1 1 0 011 0l7.97 4.44c.32.17.53.5.53.88v9zM12 4.13L5.47 7.75 12 11.38l6.53-3.63L12 4.13zM12 12.63l-6.53-3.63v7.25l6.53 3.63v-7.25zm1 7.25l6.53-3.63v-7.25L13 12.63v7.25z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ), 
    category: "Custom" 
  },
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
