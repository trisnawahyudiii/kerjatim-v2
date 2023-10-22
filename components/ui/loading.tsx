"use client";

import Lottie from "lottie-react";
import Loading from "assets/loading.json";
import Image from "next/image";

export const LoadingComponent = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center gap-[32px]">
      <Image
        src="/logo-kerjatim.png"
        width={212}
        height={100}
        alt="logo kerjatim"
        className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
      />
      <Lottie animationData={Loading} className="w-[640px] h-[640px]" />;
    </div>
  );
};
