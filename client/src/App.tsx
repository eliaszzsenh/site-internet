import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Eliasz from "@/pages/eliasz";
import DemoPreview from "@/pages/demo-preview";
import TermsOfService from "@/pages/legal/terms";
import PrivacyPolicy from "@/pages/legal/privacy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/eliasz" component={Eliasz} />
      <Route path="/demo-preview/:id" component={DemoPreview} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
