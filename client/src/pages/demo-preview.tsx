import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Smartphone, Monitor } from "lucide-react";
import { useState } from "react";

export default function DemoPreview() {
  const [match, params] = useRoute("/demo-preview/:id");
  const id = params?.id;
  
  // Parse query params for mocked data transfer
  const searchParams = new URLSearchParams(window.location.search);
  const businessName = searchParams.get("business") || "Your Business";
  const targetUrl = searchParams.get("url") || "";
  
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-black sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button variant="ghost" className="h-10 -ml-4 font-bold uppercase tracking-wider">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-black/20" />
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 bg-black" />
              <span className="font-black uppercase tracking-tighter text-lg">
                {businessName} <span className="text-black/40 font-medium tracking-normal text-sm ml-2">AI Assistant Preview</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex border border-black p-1 gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setDevice("mobile")}
                className={`h-8 w-8 p-0 rounded-none ${device === "mobile" ? "bg-black text-white" : "hover:bg-black/10"}`}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setDevice("desktop")}
                className={`h-8 w-8 p-0 rounded-none ${device === "desktop" ? "bg-black text-white" : "hover:bg-black/10"}`}
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
            
            {targetUrl && (
              <Button 
                className="h-9 rounded-none bg-black px-4 font-bold uppercase tracking-widest text-white hover:bg-black/90"
                onClick={() => window.open(targetUrl, '_blank')}
              >
                Visit Site <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative flex items-center justify-center p-8">
        {/* Device Frame */}
        <div 
          className={`
            relative bg-white border-[3px] border-black shadow-2xl transition-all duration-500 ease-in-out
            ${device === "mobile" ? "w-[375px] h-[667px] rounded-[3rem] border-[8px]" : "w-full max-w-6xl h-[80vh] rounded-none"}
          `}
        >
          {/* Mock Widget Overlay */}
          <div className="absolute bottom-6 right-6 z-20">
             <div className="bg-black text-white p-4 rounded-none shadow-xl flex items-center gap-3 max-w-[300px] cursor-pointer hover:scale-105 transition-transform">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shrink-0">
                    <div className="h-3 w-3 bg-black rounded-full animate-pulse" />
                </div>
                <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">AI Assistant</div>
                    <div className="text-[13px] font-bold leading-tight">
                        Hi! I can help you book an appointment at {businessName}.
                    </div>
                </div>
             </div>
          </div>

          {/* Iframe Placeholder */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden relative">
             {targetUrl ? (
                <iframe 
                    src={targetUrl} 
                    className="w-full h-full border-0 opacity-50 grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                    title="Website Preview"
                />
             ) : (
                <div className="text-center p-8">
                    <div className="text-4xl font-black text-black/10 mb-4">PREVIEW</div>
                    <p className="text-black/40 font-medium">Content for ID: {id}</p>
                </div>
             )}
             
             {/* Overlay to prevent interaction with iframe and show it's a preview */}
             <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          </div>
        </div>
      </main>
    </div>
  );
}
