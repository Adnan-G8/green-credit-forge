import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

interface UserDashboardProps {
  fagriId?: string;
}

export default function UserDashboardPage({ fagriId }: UserDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-foreground mb-8">User Dashboard</h1>
          <p className="text-lg text-muted-foreground">User dashboard for {fagriId || 'guest'} coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}