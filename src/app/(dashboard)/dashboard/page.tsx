export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Flocks" value="—" />
        <StatCard label="Total Birds" value="—" />
        <StatCard label="Eggs Today" value="—" />
        <StatCard label="Feed Used" value="—" />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-semibold">{value}</p>
    </div>
  );
}
