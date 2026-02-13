import { motion } from "framer-motion";

export function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full border-[3px] border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      {/* Browser Header */}
      <div className="flex items-center justify-between border-b-[3px] border-black bg-white px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-black" />
          <div className="h-3 w-3 rounded-full bg-black" />
          <div className="h-3 w-3 rounded-full bg-black" />
        </div>
        <div className="flex h-7 w-1/2 items-center justify-center border-2 border-black bg-gray-50 px-2 text-[10px] font-black uppercase tracking-widest text-black/40">
          crackito.uk
        </div>
        <div className="w-10" />
      </div>

      {/* Browser Content */}
      <div className="relative w-full bg-white">
        {/* Simulated Website - Simple Clean Layout */}
        <div className="absolute inset-0 p-12 opacity-[0.03]">
          <div className="h-6 w-32 bg-black mb-8" />
          <div className="h-16 w-3/4 bg-black mb-6" />
          <div className="space-y-2 mb-12">
            <div className="h-4 w-full bg-black" />
            <div className="h-4 w-full bg-black" />
            <div className="h-4 w-2/3 bg-black" />
          </div>
          <div className="flex gap-6">
            <div className="h-40 w-1/3 bg-black" />
            <div className="h-40 w-1/3 bg-black" />
            <div className="h-40 w-1/3 bg-black" />
          </div>
        </div>
        
        {/* The Widget */}
        <div className="relative z-10 flex items-end justify-end p-8 min-h-[400px]">
           <div className="w-full max-w-xs drop-shadow-2xl">
              {children}
           </div>
        </div>
      </div>
    </div>
  );
}
