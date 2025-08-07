
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function CertificationDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-800 mb-8">Certification Dashboard</h1>
          <p className="text-lg text-slate-600">Certification dashboard coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
