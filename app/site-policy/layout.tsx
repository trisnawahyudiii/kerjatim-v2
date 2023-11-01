import { LandingFooter, Navbar } from "@/layouts";

interface SitePolicyLayoutProps {
  children: React.ReactNode;
}

export default function SitePolicyLayout({ children }: SitePolicyLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}
