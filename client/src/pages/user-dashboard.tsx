
interface UserDashboardProps {
  fagriId: string;
}

export function UserDashboard({ fagriId }: UserDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-xl">User Dashboard: {fagriId}</div>
    </div>
  );
}
