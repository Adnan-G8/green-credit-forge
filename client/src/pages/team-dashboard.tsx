import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function TeamDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-foreground mb-8">Team Dashboard</h1>
          <p className="text-lg text-muted-foreground">Team dashboard coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}