import { cn } from "@/lib";
import Link from "next/link";
import Image from "next/image";
import { AuthImageSlider } from "components/auth-image-slider";
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
      <div className="hidden flex-col bg-pr-blue-1 md:flex">
        <Link href="/">
          <div className="flex h-fit w-fit items-center justify-center rounded-br-[64px] bg-white px-[64px] py-3">
            <Image
              src="/logo-kerjatim.png"
              alt="logo kerjatim"
              width={106}
              height={50}
            />
          </div>
        </Link>

        <div className="mx-16 my-12  flex h-full flex-col text-center text-white">
          <h1 className="my-3 text-4xl font-semibold">Selamat Datang!</h1>
          <AuthImageSlider />
        </div>
      </div>

      {/* login form */}
      <div>{children}</div>
    </div>
  );
};
