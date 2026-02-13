import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { ArrowRight } from "lucide-react";

const formSchema = z.object({
  url: z.string().min(1, "URL is required").refine((val) => {
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
    return pattern.test(val);
  }, "Please enter a valid website (e.g., nike.com)"),
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

type FormData = z.infer<typeof formSchema>;

export function WebsitePreview() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Form: Full lead info
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
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

  const watchIndustry = form.watch("industry");
  const watchChallenge = form.watch("biggestChallenge");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      let finalUrl = data.url.trim();
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = `https://${finalUrl}`;
      }
      
      const payload = { ...data, url: finalUrl, selectedLanguage: 'en' };
      
      const [result] = await Promise.all([
        fetch('https://widget.crackito.uk/api/demo-preview/create', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Demo-API-Key': 'ilnaj-demo-2024-secure'
          },
          body: JSON.stringify(payload)
        }).then(async res => {
          if (!res.ok) throw new Error('Failed to create preview');
          return res.json();
        }),
        new Promise(resolve => setTimeout(resolve, 4000))
      ]);
      
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
    return (
      <div 
        ref={containerRef}
        className="w-full max-w-2xl mx-auto border-2 border-black bg-white p-8"
      >
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          {!previewUrl ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-black border-t-transparent animate-spin mx-auto mb-6"></div>
              <h2 className="text-[24px] font-black uppercase tracking-tighter mb-4">GENERATING PREVIEW...</h2>
              <p className="text-[16px] text-black/60 font-medium">Please wait while we prepare your demo.</p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-4 text-center">
              <div className="text-[24px] font-bold text-black uppercase tracking-tight">
                Your Preview is Ready!
              </div>
              <p className="text-[15px] text-black/60">
                We've analyzed your website and created a personalized AI assistant.
              </p>
              <Button
                onClick={() => previewUrl && window.open(previewUrl, '_blank')}
                className="h-16 rounded-none bg-black px-10 text-[18px] font-black uppercase tracking-widest text-white hover:bg-black/90 transition-all w-full"
              >
                View Preview <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-[13px] text-black/40 font-medium">
                Preview expires in 10 minutes
              </p>
              <Button
                variant="ghost"
                onClick={() => {
                  setPreviewUrl(null);
                  form.reset();
                }}
                className="text-[11px] font-bold uppercase tracking-widest text-black/40 hover:text-black mt-2"
              >
                Create another preview
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-[28px] font-black uppercase tracking-tighter mb-2">See AI on Your Website</h2>
        <p className="text-[16px] text-black/60 font-medium">
          Enter your website URL to get started.
        </p>
      </div>

      <div className="border-2 border-black p-8 bg-white">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[14px] font-bold uppercase tracking-wide">Enter your website URL *</label>
            <Input
              {...form.register("url")}
              placeholder="e.g., https://nike.com"
              className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
            />
            {form.formState.errors.url && (
              <p className="text-red-500 text-xs font-bold uppercase">{form.formState.errors.url.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-[14px] font-bold uppercase tracking-wide">Business Name *</label>
            <Input
              {...form.register("businessName")}
              placeholder="e.g., Manuel's Bakery"
              className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
              disabled={isLoading}
            />
            {form.formState.errors.businessName && (
              <p className="text-red-500 text-xs font-bold uppercase">{form.formState.errors.businessName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-[14px] font-bold uppercase tracking-wide">Email Address *</label>
            <Input
              {...form.register("email")}
              type="email"
              placeholder="you@company.com"
              className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
              disabled={isLoading}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs font-bold uppercase">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[14px] font-bold uppercase tracking-wide">Industry *</label>
              <Select onValueChange={(val) => form.setValue("industry", val)} disabled={isLoading}>
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
                  {...form.register("industryOther")}
                  placeholder="Please specify industry"
                  className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0 mt-2 border-l-[4px]"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-[14px] font-bold uppercase tracking-wide">Company Size</label>
              <Select onValueChange={(val) => form.setValue("companySize", val)} disabled={isLoading}>
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
              <Select onValueChange={(val) => form.setValue("biggestChallenge", val)} disabled={isLoading}>
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
              {form.formState.errors.biggestChallenge && (
                <p className="text-red-500 text-xs font-bold uppercase">{form.formState.errors.biggestChallenge.message}</p>
              )}
              {watchChallenge === "other" && (
                <Input
                  {...form.register("challengeOther")}
                  placeholder="Describe your challenge"
                  className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0 mt-2 border-l-[4px]"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-[14px] font-bold uppercase tracking-wide">Monthly Traffic *</label>
              <Select onValueChange={(val) => form.setValue("monthlyTraffic", val)} disabled={isLoading}>
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
              {form.formState.errors.monthlyTraffic && (
                <p className="text-red-500 text-xs font-bold uppercase">{form.formState.errors.monthlyTraffic.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[14px] font-bold uppercase tracking-wide">Additional Notes</label>
            <Textarea
              {...form.register("notes")}
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

          <p className="text-center text-[12px] text-black/40 font-bold uppercase tracking-widest">
            No credit card required • Instant Preview
          </p>
        </form>
      </div>
    </div>
  );
}
