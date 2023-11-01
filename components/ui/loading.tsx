"use client";

import Lottie from "lottie-react";
import Loading from "assets/loading.json";
import Image from "next/image";
import { cn } from "@/lib";

interface LoadingComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LoadingComponent: React.FC<LoadingComponentProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-[32px]",
        className,
      )}
      {...props}
    >
      <Image
        src="/logo-kerjatim.png"
        width={212}
        height={100}
        alt="logo kerjatim"
        className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform p-4"
      />
      <Lottie animationData={Loading} className="h-[640px] w-[640px]" />;
    </div>
  );
};
