import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
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
  businessName: z.string().min(1, "Business Name is required"),
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function WebsitePreview() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      url: "",
      email: "",
      phone: "",
      industry: "",
      companySize: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate processing for 2 seconds to show the animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const response = await fetch('/api/demo-preview/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Demo-API-Key': 'ilnaj-demo-2024-secure'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Analysis complete",
          description: "Your custom preview is ready.",
        });
        setPreviewUrl(result.previewUrl);
        
        // Log lead capture (optional, as backend likely handles it)
        console.log('Lead captured:', { email: data.email, businessName: data.businessName, brandName: result.brandName });
      } else {
        throw new Error(result.error || 'Failed to create preview');
      }
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not generate preview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (previewUrl) {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-8 border-2 border-black bg-white gap-6">
        <div className="text-[48px]">✅</div>
        <div className="text-[24px] font-bold text-black uppercase tracking-tight">
          Your Preview is Ready!
        </div>
        <p className="text-center text-[15px] text-black/60">
          We've analyzed your website and created a personalized AI assistant.
        </p>
        <Button
          onClick={() => window.open(previewUrl, '_blank')}
          className="h-16 rounded-none bg-black px-10 text-[18px] font-black uppercase tracking-widest text-white hover:bg-black/90 transition-all w-full"
        >
          View Preview <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <div className="text-[13px] text-black/40 font-medium">
          Preview expires in 10 minutes
        </div>
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
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-[28px] font-black uppercase tracking-tighter mb-2">See AI on Your Website</h2>
        <p className="text-[16px] text-black/60 font-medium">Enter your details and we'll create a personalized AI assistant preview for your business.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-2 border-black p-8 bg-white">
        {/* Required Fields */}
        <div className="space-y-2">
          <label htmlFor="businessName" className="block text-[14px] font-bold uppercase tracking-wide">
            Business Name *
          </label>
          <Input
            {...form.register("businessName")}
            id="businessName"
            placeholder="e.g., Manuel's Bakery"
            className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
            disabled={isLoading}
          />
          {form.formState.errors.businessName && (
            <p className="text-red-500 text-xs font-bold uppercase">{form.formState.errors.businessName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="url" className="block text-[14px] font-bold uppercase tracking-wide">
            Website URL *
          </label>
          <Input
            {...form.register("url")}
            id="url"
            placeholder="https://yourwebsite.com"
            className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
            disabled={isLoading}
          />
          {form.formState.errors.url && (
            <p className="text-red-500 text-xs font-bold uppercase">{form.formState.errors.url.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-[14px] font-bold uppercase tracking-wide">
            Email Address *
          </label>
          <Input
            {...form.register("email")}
            id="email"
            type="email"
            placeholder="you@company.com"
            className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
            disabled={isLoading}
          />
          <p className="text-[12px] text-black/40 font-medium">We'll send you the preview link and follow up.</p>
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs font-bold uppercase">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Optional Fields - 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-[14px] font-bold uppercase tracking-wide">
              Phone Number
            </label>
            <Input
              {...form.register("phone")}
              id="phone"
              type="tel"
              placeholder="+1 234 567 890"
              className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus-visible:ring-0"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="industry" className="block text-[14px] font-bold uppercase tracking-wide">
              Industry
            </label>
            <Select onValueChange={(val) => form.setValue("industry", val)} disabled={isLoading}>
              <SelectTrigger className="h-12 border-2 border-black rounded-none px-4 text-[16px] focus:ring-0">
                <SelectValue placeholder="Select industry..." />
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
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="companySize" className="block text-[14px] font-bold uppercase tracking-wide">
            Company Size
          </label>
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

        <div className="space-y-2">
          <label htmlFor="notes" className="block text-[14px] font-bold uppercase tracking-wide">
            Additional Notes
          </label>
          <Textarea
            {...form.register("notes")}
            id="notes"
            placeholder="Tell us about your specific needs or questions..."
            className="min-h-[100px] border-2 border-black rounded-none p-4 text-[16px] resize-y focus-visible:ring-0"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-16 w-full rounded-none bg-black text-[18px] font-black uppercase tracking-widest text-white hover:bg-black/90 transition-all"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span>Creating your AI preview</span>
              <span className="flex gap-1 ml-2">
                <span className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 bg-white rounded-full animate-bounce"></span>
              </span>
            </div>
          ) : (
            "Generate My Preview"
          )}
        </Button>
      </form>
      
      {isLoading && (
        <p className="text-center mt-4 text-[14px] text-black/60 font-medium animate-pulse">
          This takes about 10 seconds...
        </p>
      )}
    </div>
  );
}
