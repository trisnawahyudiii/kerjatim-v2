import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="mt-12 flex flex-col-reverse gap-5 lg:flex-row lg:gap-0">
      <div className="flex flex-col justify-center gap-3 lg:w-2/3">
        <h1 className="text-xl font-semibold lg:text-4xl">
          <span className="text-foreground">Aplikasi</span> manajemen tugas
          menggunakan <span className="text-foreground">bahasa indonesia</span>,
          menarik dan mudah dipahami.
        </h1>
        <p className="text-xl">
          Bersama <span className="text-foreground">KERJATIM</span> aplikasi
          manajemen projek yang membantu mengoptimalkan produktivitas, mengatur
          prioritas dan meningkatkan kolaborasi antar tim.
        </p>
        <Link href={"/dashboard"}>
          <Button>Coba Gratis</Button>
        </Link>
      </div>
      <div className="relative h-fit">
        <Image src="/macbook.png" alt="macbook" width={800} height={534} />
      </div>
    </div>
  );
};
