import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./components/language-provider";
import { PasswordProtection } from "./components/password-protection";
import { SessionExpiryHandler } from "./components/session-expiry-handler";
import { useAuthentication } from "./hooks/use-authentication";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import Home from "@/pages/home";
import Security from "@/pages/security";
import EufdStandard from "@/pages/eufd-standard";
import CO2Certification from "@/pages/co2-certification";
import LegalDocumentation from "@/pages/legal-documentation";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import GDPR from "@/pages/gdpr";
import Cookies from "@/pages/cookies";

function ProtectedRouter() {
  useScrollToTop();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/security" component={Security} />
      <Route path="/eufd-standard" component={EufdStandard} />
      <Route path="/co2-certification" component={CO2Certification} />
      <Route path="/legal-documentation" component={LegalDocumentation} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/gdpr" component={GDPR} />
      <Route path="/cookies" component={Cookies} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isAuthenticated, isLoading, authenticate } = useAuthentication();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          {!isAuthenticated ? (
            <PasswordProtection onAuthenticate={authenticate} />
          ) : (
            <>
              <ProtectedRouter />
              <SessionExpiryHandler />
            </>
          )}
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
