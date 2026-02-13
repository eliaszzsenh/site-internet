import { motion } from "framer-motion";

export function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden border-[3px] border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      {/* Browser Header */}
      <div className="flex items-center justify-between border-b-[3px] border-black bg-white px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full border-2 border-black" />
          <div className="h-3 w-3 rounded-full border-2 border-black" />
          <div className="h-3 w-3 rounded-full border-2 border-black" />
        </div>
        <div className="flex h-6 w-1/2 items-center justify-center border-2 border-black bg-gray-50 px-2 text-[10px] font-bold text-black/40 uppercase tracking-tighter">
          crackito.uk/preview
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Browser Content */}
      <div className="relative aspect-video w-full bg-white overflow-hidden">
        {/* Background "Website" Mockup */}
        <div className="absolute inset-0 p-6 space-y-4 opacity-10">
            <div className="h-8 w-1/3 bg-black" />
            <div className="h-4 w-full bg-black" />
            <div className="h-4 w-full bg-black" />
            <div className="h-4 w-2/3 bg-black" />
            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="h-32 bg-black" />
                <div className="h-32 bg-black" />
                <div className="h-32 bg-black" />
            </div>
        </div>
        
        {/* Content injected here */}
        <div className="relative h-full w-full">
            {children}
        </div>
      </div>
    </div>
  );
}
