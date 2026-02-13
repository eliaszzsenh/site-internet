import { motion } from "framer-motion";

const integrations = [
  { 
    name: "Stripe", 
    icon: (
      <svg viewBox="0 0 60 25" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.02 1.04-.06 1.48zm-6.02-5.79c-1.26 0-2.13 1.01-2.35 2.77h4.57c-.06-1.72-.81-2.77-2.22-2.77z"/>
      </svg>
    ), 
    category: "Payments" 
  },
  { 
    name: "Google Calendar", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
      </svg>
    ), 
    category: "Booking" 
  },
  { 
    name: "n8n", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#FF4700" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" fill="#FF4700"/>
      </svg>
    ), 
    category: "Automation" 
  },
  { 
    name: "Telegram", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
        <path fill="#229ED9" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.01-1.252-.241-1.865-.44-.751-.245-1.349.297-.789-.374-1.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.477-1.635z"/>
      </svg>
    ), 
    category: "Channels" 
  },
  { 
    name: "WhatsApp", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
        <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.032-5.396 12.035-12.031.002-3.215-1.248-6.237-3.527-8.514z"/>
      </svg>
    ), 
    category: "Channels" 
  },
  { 
    name: "Google Sheets", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0F9D58" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h6v14H5zm14 0h-6v-7h6v7zm0-9h-6V5h6v5z"/>
      </svg>
    ), 
    category: "CRM / Data" 
  },
  { 
    name: "Webhooks", 
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 16.98h-5.99c-1.1 0-1.95.68-2.95 1.76"/>
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 16.98h-6"/>
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 16.98h5.99c1.1 0 1.95.68 2.95 1.76"/>
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 12a6 6 0 0 0-9.84-2.64L3 16"/>
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 12a6 6 0 0 0 9.84 2.64L21 8"/>
      </svg>
    ), 
    category: "Custom" 
  },
];

export function IntegrationGrid() {
  return (
    <div className="mx-auto mt-20 max-w-[1100px]">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {integrations.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-white p-8 flex flex-col items-center justify-center text-center transition-all hover:bg-black border border-transparent hover:border-black"
          >
            <div className="text-black group-hover:text-white transition-colors duration-300 flex items-center justify-center h-10">
              {item.icon}
            </div>
            <div className="mt-3 text-[12px] font-black uppercase tracking-wider text-black group-hover:text-white">
              {item.name}
            </div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-widest text-black/40 group-hover:text-white/40">
              {item.category}
            </div>
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
