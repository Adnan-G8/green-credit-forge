import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

interface EmployeeProfileProps {
  employeeId?: string;
}

export default function EmployeeProfilePage({ employeeId }: EmployeeProfileProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-foreground mb-8">Employee Profile</h1>
          <p className="text-lg text-muted-foreground">Employee profile for {employeeId || 'unknown'} coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}