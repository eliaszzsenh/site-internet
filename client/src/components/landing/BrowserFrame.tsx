import { motion } from "framer-motion";

export function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden border-[3px] border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      {/* Browser Header */}
      <div className="flex items-center justify-between border-b-[3px] border-black bg-white px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-black" />
          <div className="h-3 w-3 rounded-full bg-black" />
          <div className="h-3 w-3 rounded-full bg-black" />
        </div>
        <div className="flex h-7 w-1/2 items-center justify-center border-2 border-black bg-gray-50 px-2 text-[10px] font-black uppercase tracking-widest text-black/40">
          crackito.uk/preview
        </div>
        <div className="w-10" />
      </div>

      {/* Browser Content */}
      <div className="relative aspect-[16/10] w-full bg-white overflow-hidden">
        {/* Simulated Website Content - more substantial */}
        <div className="absolute inset-0 p-8 space-y-6 opacity-[0.05]">
          <div className="flex items-center justify-between">
             <div className="h-8 w-24 bg-black" />
             <div className="flex gap-4">
                <div className="h-2 w-12 bg-black" />
                <div className="h-2 w-12 bg-black" />
                <div className="h-2 w-12 bg-black" />
             </div>
          </div>
          <div className="h-12 w-1/2 bg-black mt-12" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-black" />
            <div className="h-3 w-full bg-black" />
            <div className="h-3 w-3/4 bg-black" />
          </div>
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="h-32 bg-black" />
            <div className="h-32 bg-black" />
            <div className="h-32 bg-black" />
          </div>
        </div>
        
        {/* The Widget - Positioned like a real chat widget */}
        <div className="absolute inset-0 z-10 flex items-end justify-end p-6">
           <div className="w-full max-w-[280px] drop-shadow-2xl">
              {children}
           </div>
        </div>
        
        {/* Browser Overlay / Glass effect */}
        <div className="absolute inset-0 pointer-events-none border-t border-white/20" />
      </div>
    </div>
  );
}

