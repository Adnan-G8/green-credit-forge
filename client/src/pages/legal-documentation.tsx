
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function LegalDocumentation() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-800 mb-8">Legal Documentation</h1>
          <p className="text-lg text-slate-600">Legal documentation coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
