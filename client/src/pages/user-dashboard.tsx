// Named export to match App.tsx import with fagriId prop
export function UserDashboard({ fagriId }: { fagriId: string }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">User Dashboard</h1>
        <p className="text-lg text-slate-600">FAGRI ID: {fagriId}</p>
        <p className="text-lg text-slate-600">User dashboard content coming soon.</p>
      </div>
    </div>
  );
}