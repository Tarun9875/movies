import AdminHeader from "../../components/layout/AdminHeader";
import { useEffect } from "react";

export default function AdminDashboard() {
  useEffect(() => {
    document.documentElement.classList.add("admin");

    return () => {
      document.documentElement.classList.remove("admin");
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* 🔥 Admin Header */}
      <AdminHeader />

      {/* Page Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card title="Total Revenue" value="$45,231.89" />
          <Card title="Active Users" value="2,350" />
          <Card title="Total Orders" value="1,234" />
          <Card title="Conversion Rate" value="3.42%" />
        </div>
      </div>
    </div>
  );
}

/* =========================
   CARD COMPONENT (FIXED)
========================= */

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="p-6 rounded-xl shadow-sm border"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)"
      }}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h2
        className="text-2xl font-bold mt-2"
        style={{ color: "var(--primary-color)" }}
      >
        {value}
      </h2>
    </div>
  );
}
