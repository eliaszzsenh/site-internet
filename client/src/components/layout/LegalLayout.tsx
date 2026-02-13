import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
}

export function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <header className="sticky top-0 z-50 border-b border-black bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="h-8 w-8 bg-black transition-transform group-hover:scale-90" />
              <div className="text-[16px] font-black tracking-tighter uppercase">ILNAJ</div>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="h-10 rounded-none border-2 border-black font-bold uppercase tracking-widest flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[800px] px-6 py-24 md:py-32">
        <div className="mb-16 pb-8 border-b-4 border-black">
          <h1 className="text-[48px] md:text-[80px] font-black leading-[0.9] tracking-tighter uppercase mb-4">
            {title}
          </h1>
          <p className="text-[13px] font-black tracking-[0.25em] text-black/40 uppercase">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-neutral max-w-none 
          prose-h2:text-[24px] prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-black prose-h2:pl-4
          prose-p:text-[18px] prose-p:leading-relaxed prose-p:text-black/80 prose-p:mb-6
          prose-ul:list-none prose-ul:pl-0
          prose-li:text-[18px] prose-li:text-black/80 prose-li:mb-4 prose-li:before:content-['■'] prose-li:before:mr-3 prose-li:before:text-black
          prose-strong:text-black prose-strong:font-black">
          {children}
        </div>
      </div>
    </main>
  );
}
