import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Eliasz() {
  return (
    <main className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="h-8 w-8 bg-black transition-transform group-hover:scale-90" />
              <div className="text-[16px] font-black tracking-tighter uppercase">ILNAJ</div>
            </div>
          </Link>
          
          <nav className="hidden items-center gap-10 md:flex">
             <Link href="/">
               <a className="text-[13px] font-bold uppercase tracking-wider hover:underline transition-all">Home</a>
             </Link>
          </nav>

           <div className="flex items-center gap-4">
            <Link href="/">
                <Button className="h-10 rounded-none bg-black px-6 font-bold uppercase tracking-widest text-white hover:bg-black/90">
                    Back to Site
                </Button>
            </Link>
           </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-24">
        <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Image Side - 5 cols */}
            <div className="md:col-span-5 relative">
                <div className="border-2 border-black p-3 bg-white relative z-10">
                    <div className="aspect-[4/5] w-full bg-gray-100 overflow-hidden relative">
                        <img 
                            src="/profil.png" 
                            alt="Eliasz - Founder" 
                            className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                    </div>
                </div>
                {/* Decorative offset border */}
                <div className="absolute top-6 left-6 w-full h-full border-2 border-black/20 -z-0 hidden md:block" />
            </div>

            {/* Text Side - 7 cols */}
            <div className="md:col-span-7 flex flex-col justify-center pt-4 md:pt-12">
                <div className="inline-block border border-black px-3 py-1 text-[11px] font-black tracking-[0.2em] uppercase mb-8 w-fit bg-black text-white">
                    About The Founder
                </div>
                
                <h1 className="text-[48px] md:text-[90px] font-black leading-[0.85] tracking-tighter uppercase mb-10">
                    ELIASZ
                </h1>

                <div className="space-y-8 text-[18px] md:text-[20px] font-medium text-black/80 leading-relaxed max-w-2xl">
                    <p>
                        <span className="font-bold text-black">I build digital infrastructure.</span> Not just websites, but autonomous systems that work while you sleep.
                    </p>
                    <p>
                        As the founder of ILNAJ, my obsession is the intersection of <span className="underline decoration-2 underline-offset-4">Brutalist aesthetics</span> and <span className="underline decoration-2 underline-offset-4">AI utility</span>. I believe tools should be sharp, precise, and invisible.
                    </p>
                    <p>
                        I created this platform to give businesses the same power that tech giants have: an untiring workforce that handles commerce, bookings, and support instantly.
                    </p>
                </div>
                
                <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 border-t-2 border-black pt-8">
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Role</div>
                        <div className="text-[14px] font-bold uppercase">Founder & Engineer</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Location</div>
                        <div className="text-[14px] font-bold uppercase">Global / Remote</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Contact</div>
                        <Link href="/#cta">
                            <a className="text-[14px] font-bold uppercase underline hover:text-black/60">Get in touch</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
