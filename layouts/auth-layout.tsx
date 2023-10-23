import { cn } from "@/lib";
import Link from "next/link";
import Image from "next/image";
import { AuthImageSlider } from "@/components";
import { DashboardNavbar } from ".";

interface AuthLayoutProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AuthPageLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div className={cn("grid md:grid-cols-2", className)}>
      <div className="md:hidden">
        <DashboardNavbar />
      </div>
      {/* swiper */}
      <div className="hidden md:flex bg-pr-blue-1 flex-col">
        <Link href="/">
          <div className="w-fit h-fit flex items-center justify-center bg-white px-[64px] rounded-br-[64px] py-3">
            <Image
              src="/logo-kerjatim.png"
              alt="logo kerjatim"
              width={106}
              height={50}
            />
          </div>
        </Link>

        <div className="flex flex-col  my-12 mx-16 h-full text-white text-center">
          <h1 className="text-4xl font-semibold my-3">Selamat Datang!</h1>
          <AuthImageSlider />
        </div>
      </div>

      {/* login form */}
      <div>{children}</div>
    </div>
  );
};
