
import { useRoute } from 'wouter';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ProjectDetails() {
  const [match, params] = useRoute('/project/:id');
  
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-800 mb-8">Project Details</h1>
          <p className="text-lg text-slate-600">Project ID: {params?.id}</p>
          <p className="text-base text-slate-500">Project details coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
