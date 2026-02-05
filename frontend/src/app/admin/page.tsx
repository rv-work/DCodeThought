export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome Admin 👋</h1>

      <p className="text-muted dark:text-muted-dark">
        Use the sidebar to manage problems, contests, POTD & more.
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-6">

        <div className="p-4 border border-border rounded-lg bg-card shadow-card">
          <h3 className="text-lg font-semibold">Problems</h3>
          <p className="text-muted dark:text-muted-dark">Manage all problems.</p>
        </div>

        <div className="p-4 border border-border rounded-lg bg-card shadow-card">
          <h3 className="text-lg font-semibold">Contests</h3>
          <p className="text-muted dark:text-muted-dark">Weekly & Biweekly contests.</p>
        </div>

        <div className="p-4 border border-border rounded-lg bg-card shadow-card">
          <h3 className="text-lg font-semibold">POTD</h3>
          <p className="text-muted dark:text-muted-dark">Configure daily problem.</p>
        </div>

      </div>
    </div>
  );
}
