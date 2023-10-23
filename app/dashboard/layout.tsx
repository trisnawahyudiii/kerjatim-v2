import { DashboardNavbar } from "@/layouts";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <DashboardNavbar />
      {children}
    </div>
  );
}
