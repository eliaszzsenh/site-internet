import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check } from "lucide-react";

// Loading Animation Component
function OrbitingSquares({ isSuccess = false }: { isSuccess?: boolean }) {
  const duration = 2;
  const ease: [number, number, number, number] = [0.4, 0, 0.2, 1]; // Smooth ease-in-out
  
  // Orbiting squares positions (closer to center)
  const positions = {
    tl: { top: '12.5%', left: '12.5%' },    // Top-left
    tr: { top: '12.5%', left: '87.5%' },   // Top-right
    br: { top: '87.5%', left: '87.5%' }, // Bottom-right
    bl: { top: '87.5%', left: '12.5%' }    // Bottom-left
  };

  const centerPosition = { top: '50%', left: '50%' };

  return (
    <div className="relative w-32 h-32 flex items-center justify-center mb-6">
      {/* Central Square - Persistent */}
      <motion.div 
        className="relative w-16 h-16 bg-black z-20 flex items-center justify-center"
        animate={{ 
          scale: 1,
          rotate: isSuccess ? 0 : 0 
        }}
        transition={{ duration: 0.5, ease }}
      >
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "backOut", delay: 0.1 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Square 1 */}
      <motion.div
        className="absolute w-6 h-6 bg-black rounded-none z-10"
        style={{ marginTop: '-12px', marginLeft: '-12px' }}
        initial={positions.tl}
        animate={isSuccess ? {
          top: centerPosition.top,
          left: centerPosition.left,
          opacity: 0
        } : {
          top: [positions.tl.top, positions.tr.top, positions.tr.top, positions.br.top, positions.br.top, positions.bl.top, positions.bl.top, positions.tl.top],
          left: [positions.tl.left, positions.tr.left, positions.tr.left, positions.br.left, positions.br.left, positions.bl.left, positions.bl.left, positions.tl.left],
          opacity: 1
        }}
        transition={{
          duration: isSuccess ? 0.5 : duration * 4,
          ease,
          repeat: isSuccess ? 0 : Infinity,
          times: isSuccess ? undefined : [0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1]
        }}
      />
      
      {/* Square 2 */}
      <motion.div
        className="absolute w-6 h-6 bg-black rounded-none z-10"
        style={{ marginTop: '-12px', marginLeft: '-12px' }}
        initial={positions.tr}
        animate={isSuccess ? {
          top: centerPosition.top,
          left: centerPosition.left,
          opacity: 0
        } : {
          top: [positions.tr.top, positions.br.top, positions.br.top, positions.bl.top, positions.bl.top, positions.tl.top, positions.tl.top, positions.tr.top],
          left: [positions.tr.left, positions.br.left, positions.br.left, positions.bl.left, positions.bl.left, positions.tl.left, positions.tl.left, positions.tr.left],
          opacity: 1
        }}
        transition={{
          duration: isSuccess ? 0.5 : duration * 4,
          ease,
          repeat: isSuccess ? 0 : Infinity,
          times: isSuccess ? undefined : [0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1]
        }}
      />
      
      {/* Square 3 */}
      <motion.div
        className="absolute w-6 h-6 bg-black rounded-none z-10"
        style={{ marginTop: '-12px', marginLeft: '-12px' }}
        initial={positions.br}
        animate={isSuccess ? {
          top: centerPosition.top,
          left: centerPosition.left,
          opacity: 0
        } : {
          top: [positions.br.top, positions.bl.top, positions.bl.top, positions.tl.top, positions.tl.top, positions.tr.top, positions.tr.top, positions.br.top],
          left: [positions.br.left, positions.bl.left, positions.bl.left, positions.tl.left, positions.tl.left, positions.tr.left, positions.tr.left, positions.br.left],
          opacity: 1
        }}
        transition={{
          duration: isSuccess ? 0.5 : duration * 4,
          ease,
          repeat: isSuccess ? 0 : Infinity,
          times: isSuccess ? undefined : [0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1]
        }}
      />
      
      {/* Square 4 */}
      <motion.div
        className="absolute w-6 h-6 bg-black rounded-none z-10"
        style={{ marginTop: '-12px', marginLeft: '-12px' }}
        initial={positions.bl}
        animate={isSuccess ? {
          top: centerPosition.top,
          left: centerPosition.left,
          opacity: 0
        } : {
          top: [positions.bl.top, positions.tl.top, positions.tl.top, positions.tr.top, positions.tr.top, positions.br.top, positions.br.top, positions.bl.top],
          left: [positions.bl.left, positions.tl.left, positions.tl.left, positions.tr.left, positions.tr.left, positions.br.left, positions.br.left, positions.bl.left],
          opacity: 1
        }}
        transition={{
          duration: isSuccess ? 0.5 : duration * 4,
          ease,
          repeat: isSuccess ? 0 : Infinity,
          times: isSuccess ? undefined : [0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1]
        }}
      />
    </div>
  );
}

// Schema for Step 1
const step1Schema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

// Schema for Step 2
const step2Schema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  email: z.string().email("Valid email is required"),
  industry: z.string().optional(),
  industryOther: z.string().optional(),
  companySize: z.string().optional(),
  biggestChallenge: z.string().min(1, "Please select a challenge"),
  challengeOther: z.string().optional(),
  monthlyTraffic: z.string().min(1, "Please select monthly traffic"),
  notes: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

export function WebsitePreview() {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Form 1: URL Only
  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { url: "" },
  });

  // Form 2: Detailed Lead Info
  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      businessName: "",
      email: "",
      industry: "",
      industryOther: "",
      companySize: "",
      biggestChallenge: "",
      challengeOther: "",
      monthlyTraffic: "",
      notes: "",
    },
  });

  const watchIndustry = form2.watch("industry");
  const watchChallenge = form2.watch("biggestChallenge");

  const onStep1Submit = (data: Step1Data) => {
    setUrl(data.url);
    try {
      const hostname = new URL(data.url).hostname;
      const domain = hostname.replace('www.', '').split('.')[0];
      const suggestedName = domain.charAt(0).toUpperCase() + domain.slice(1);
      form2.setValue("businessName", suggestedName);
    } catch (e) {
      // Ignore URL parsing errors
    }
    setStep(2);
  };

  const onStep2Submit = async (data: Step2Data) => {
    setIsLoading(true);
    // Scroll to view the loading animation
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    // Artificial delay to show "Generating..." state
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    try {
      const payload = { ...data, url, selectedLanguage: 'en' };
      
      const [response] = await Promise.all([
        fetch('https://widget.crackito.uk/api/demo-preview/create', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Demo-API-Key': 'ilnaj-demo-2024-secure'
          },
          body: JSON.stringify(payload)
        }),
        // Ensure at least 4 seconds loading time
        new Promise(resolve => setTimeout(resolve, 4000))
      ]);

      if (!response.ok) {
        throw new Error('Failed to create preview');
      }

      const result = await response.json();
      
      if (result.success) {
        toast({ title: "Analysis complete", description: "Your custom preview is ready." });
        setPreviewUrl(result.previewUrl);
      } else {
        throw new Error(result.error || 'Failed to create preview');
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to create preview.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || previewUrl) {
    const isSuccess = !!previewUrl;

    return (
      <div 
        ref={containerRef}
        className="w-full max-w-2xl mx-auto border-2 border-black bg-white transition-all duration-500"
      >
        <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
          {/* The Persistent Square - Animation logic handled inside component */}
          <OrbitingSquares isSuccess={isSuccess} />

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="loading-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-[28px] font-black uppercase tracking-tighter mb-4 animate-pulse">GENERATING PREVIEW...</h2>
                <p className="text-[16px] text-black/60 font-medium">Please wait while we prepare your demo.</p>
              </motion.div>
            ) : (
              <motion.div
                key="success-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full flex flex-col items-center gap-4 mt-2"
              >
                <motion.div 
                  className="text-[24px] font-bold text-black uppercase tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Your Preview is Ready!
                </motion.div>
                
                <motion.p 
                  className="text-center text-[15px] text-black/60"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  We've analyzed your website and created a personalized AI assistant.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-full"
                >
                  <Button
                    onClick={() => previewUrl && window.open(previewUrl, '_blank')}
                    className="h-16 rounded-none bg-black px-10 text-[18px] font-black uppercase tracking-widest text-white hover:bg-black/90 transition-all w-full"
                  >
                    View Preview <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="text-[13px] text-black/40 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Preview expires in 10 minutes
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setPreviewUrl(null);
                      setStep(1);
                      form1.reset();
                      form2.reset();
                    }}
                    className="text-[11px] font-bold uppercase tracking-widest text-black/40 hover:text-black mt-2"
                  >
                    Create another preview
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-[28px] font-black uppercase tracking-tighter mb-2">See AI on Your Website</h2>
        <p className="text-[16px] text-black/60 font-medium">
          {step === 1 ? "Enter your website URL to get started." : "Almost there! Tell us about your business."}
        </p>
      </div>

      <div className="border-2 border-black p-8 bg-white transition-all">
        {step === 1 ? (
          <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                {...form1.register("url")}
                placeholder="Enter your website URL (e.g., https://nike.com)"
                className="h-14 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
              />
              {form1.formState.errors.url && (
                <p className="text-red-500 text-xs font-bold uppercase">{form1.formState.errors.url.message}</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="h-14 w-full rounded-none bg-black text-[16px] font-black uppercase tracking-widest text-white hover:bg-black/90 transition-all"
            >
              Try It Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="text-center text-[12px] text-black/40 font-bold uppercase tracking-widest mt-4">
              No credit card required • Instant Preview
            </p>
          </form>
        ) : (
          <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6">
            <div className="bg-gray-50 p-3 border border-dashed border-gray-300 flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-gray-600 truncate max-w-[200px]">{url}</span>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-xs font-bold uppercase text-black hover:underline"
              >
                Change
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-[14px] font-bold uppercase tracking-wide">Business Name *</label>
              <Input
                {...form2.register("businessName")}
                placeholder="e.g., Manuel's Bakery"
                className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
                disabled={isLoading}
              />
              {form2.formState.errors.businessName && (
                <p className="text-red-500 text-xs font-bold uppercase">{form2.formState.errors.businessName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-[14px] font-bold uppercase tracking-wide">Email Address *</label>
              <Input
                {...form2.register("email")}
                type="email"
                placeholder="you@company.com"
                className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
                disabled={isLoading}
              />
              {form2.formState.errors.email && (
                <p className="text-red-500 text-xs font-bold uppercase">{form2.formState.errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[14px] font-bold uppercase tracking-wide">Industry *</label>
                <Select onValueChange={(val) => form2.setValue("industry", val)} disabled={isLoading}>
                  <SelectTrigger className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus:ring-0">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail / E-commerce</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="healthcare">Healthcare / Medical</SelectItem>
                    <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                    <SelectItem value="services">Professional Services</SelectItem>
                    <SelectItem value="realestate">Real Estate</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="other">Other (please specify)</SelectItem>
                  </SelectContent>
                </Select>
                {watchIndustry === "other" && (
                  <Input
                    {...form2.register("industryOther")}
                    placeholder="Please specify industry"
                    className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0 mt-2 border-l-[4px]"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-bold uppercase tracking-wide">Company Size</label>
                <Select onValueChange={(val) => form2.setValue("companySize", val)} disabled={isLoading}>
                  <SelectTrigger className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus:ring-0">
                    <SelectValue placeholder="Select size..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201+">201+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[14px] font-bold uppercase tracking-wide">Biggest Challenge *</label>
                <Select onValueChange={(val) => form2.setValue("biggestChallenge", val)} disabled={isLoading}>
                  <SelectTrigger className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus:ring-0">
                    <SelectValue placeholder="Select challenge..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="getting_leads">Getting leads/traffic</SelectItem>
                    <SelectItem value="converting">Converting visitors</SelectItem>
                    <SelectItem value="bookings">Managing bookings</SelectItem>
                    <SelectItem value="response_time">Response time</SelectItem>
                    <SelectItem value="admin_work">Reducing admin work</SelectItem>
                    <SelectItem value="other">Other (please specify)</SelectItem>
                  </SelectContent>
                </Select>
                {form2.formState.errors.biggestChallenge && (
                  <p className="text-red-500 text-xs font-bold uppercase">{form2.formState.errors.biggestChallenge.message}</p>
                )}
                {watchChallenge === "other" && (
                  <Input
                    {...form2.register("challengeOther")}
                    placeholder="Describe your challenge"
                    className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0 mt-2 border-l-[4px]"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-bold uppercase tracking-wide">Monthly Traffic *</label>
                <Select onValueChange={(val) => form2.setValue("monthlyTraffic", val)} disabled={isLoading}>
                  <SelectTrigger className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus:ring-0">
                    <SelectValue placeholder="Select volume..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100">Less than 100</SelectItem>
                    <SelectItem value="100-500">100 - 500</SelectItem>
                    <SelectItem value="500-1000">500 - 1,000</SelectItem>
                    <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                    <SelectItem value="5000+">5,000+</SelectItem>
                    <SelectItem value="not_sure">Not sure</SelectItem>
                  </SelectContent>
                </Select>
                {form2.formState.errors.monthlyTraffic && (
                  <p className="text-red-500 text-xs font-bold uppercase">{form2.formState.errors.monthlyTraffic.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[14px] font-bold uppercase tracking-wide">Additional Notes</label>
              <Textarea
                {...form2.register("notes")}
                placeholder="Any specific needs?"
                className="min-h-[80px] border-2 border-black rounded-none p-4 text-[16px] resize-y focus-visible:ring-0"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-16 w-full rounded-none bg-black text-[18px] font-black uppercase tracking-widest text-white hover:bg-black/90 transition-all"
            >
              {isLoading ? "Generating..." : "See My Demo →"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
