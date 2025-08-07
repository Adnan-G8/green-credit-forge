
interface EmployeeProfileProps {
  employeeId: string;
}

export function EmployeeProfile({ employeeId }: EmployeeProfileProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-xl">Employee Profile: {employeeId}</div>
    </div>
  );
}
