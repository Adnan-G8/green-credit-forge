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
import SimpleCO2Certification from "@/pages/simple-co2-certification";
import LegalDocumentation from "@/pages/legal-documentation";
import Dashboard from "@/pages/dashboard";
import TeamDashboard from "@/pages/team-dashboard";
import CertificationDashboard from "@/pages/certification-dashboard";
import { AdminDashboard } from "@/pages/admin-dashboard";
import { UserDashboard } from "@/pages/user-dashboard";
import { AdminAuthorizationDashboard } from "@/pages/admin-authorization-dashboard";
import { EmployeeProfile } from "@/pages/employee-profile";
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
      <Route path="/co2-certification" component={SimpleCO2Certification} />
      <Route path="/legal-documentation" component={LegalDocumentation} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/user-dashboard">
        {() => {
          const urlParams = new URLSearchParams(window.location.search);
          const fagriId = urlParams.get('fagriId') || '';
          return fagriId ? <UserDashboard fagriId={fagriId} /> : <NotFound />;
        }}
      </Route>
      <Route path="/team-dashboard" component={TeamDashboard} />
      <Route path="/certification-dashboard" component={CertificationDashboard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/admin-authorization" component={AdminAuthorizationDashboard} />
      <Route path="/employee-profile">
        {() => {
          const urlParams = new URLSearchParams(window.location.search);
          const employeeId = urlParams.get('id') || '';
          return employeeId ? <EmployeeProfile employeeId={employeeId} /> : <NotFound />;
        }}
      </Route>
      <Route path="/employee-profile/:id">
        {(params) => <EmployeeProfile employeeId={params.id} />}
      </Route>
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
            <PasswordProtection onAuthenticated={authenticate} />
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
