import { Navbar, LandingFooter } from "@/layouts";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}
