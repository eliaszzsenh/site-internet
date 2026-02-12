import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

type FormData = z.infer<typeof formSchema>;

export function WebsitePreview() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
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
        body: JSON.stringify({ url: data.url })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Analyzing website...",
          description: "Redirecting to your custom preview.",
        });
        window.location.href = result.previewUrl;
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

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex items-stretch border-2 border-black p-1 bg-white">
        <div className="relative flex-grow">
          <Input
            {...form.register("url")}
            placeholder="Enter your website URL (e.g., https://nike.com)"
            className="h-14 border-none bg-transparent px-4 text-[16px] font-medium placeholder:text-black/40 focus-visible:ring-0 rounded-none w-full"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-14 rounded-none bg-black px-8 text-[15px] font-black uppercase tracking-widest text-white hover:bg-black/90 transition-all"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-white animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-2 w-2 bg-white animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-2 w-2 bg-white animate-bounce"></span>
            </div>
          ) : (
            <span className="flex items-center gap-2">
              Try It Free <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
      
      {form.formState.errors.url && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-[13px] font-bold text-red-500 uppercase tracking-wide"
        >
          {form.formState.errors.url.message}
        </motion.div>
      )}
      
      <div className="mt-4 flex items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-black/40">
        <span>No credit card required</span>
        <span>•</span>
        <span>Instant Preview</span>
      </div>
    </div>
  );
}
