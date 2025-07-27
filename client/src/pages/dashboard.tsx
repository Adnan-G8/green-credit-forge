import { ProjectTrackingDashboard } from '@/components/project-tracking-dashboard';
import { useLanguage } from '@/components/language-provider';

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <ProjectTrackingDashboard />
      </div>
    </div>
  );
}