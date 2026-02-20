export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Revenue" value="$45,231.89" />
        <Card title="Active Users" value="2,350" />
        <Card title="Total Orders" value="1,234" />
        <Card title="Conversion Rate" value="3.42%" />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="
        p-6 rounded-xl shadow-sm
        border
        bg-[var(--card-bg)]
        border-[var(--border-color)]
        transition-colors duration-300
        hover:shadow-lg
      "
    >
      <p className="text-sm opacity-70">
        {title}
      </p>

      <h2
        className="
          text-2xl font-bold mt-2
          text-[var(--primary-color)]
        "
      >
        {value}
      </h2>
    </div>
  );
}
