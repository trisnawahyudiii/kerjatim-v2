import { AuthPageLayout, DashboardNavbar } from "@/layouts";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthPageLayout className="min-h-screen">{children}</AuthPageLayout>;
}
