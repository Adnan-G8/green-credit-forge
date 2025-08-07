
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "./components/language-provider";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import Home from "@/pages/home";
import TermsOfServicePage from "@/pages/terms-of-service";

function AppRouter() {
  useScrollToTop();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terms-of-service" component={TermsOfServicePage} />
      <Route>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Toaster />
        <AppRouter />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
