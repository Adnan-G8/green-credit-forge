
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

interface EmployeeProfileProps {
  employeeId: string;
}

export function EmployeeProfile({ employeeId }: EmployeeProfileProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-800 mb-8">Employee Profile</h1>
          <p className="text-lg text-slate-600">Profile for employee: {employeeId}</p>
          <p className="text-base text-slate-500">Employee profile coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
