import { Container } from "@/components/ui";
import Image from "next/image";

export const GooglePlay = () => {
  return (
    <Container className="my-12 flex flex-col-reverse items-center border-red-600 lg:flex-row">
      <div className="w-full lg:w-1/2">
        <h1 className="mb-5 text-2xl font-semibold">
          <span className="text-foreground">KERJATIM</span> dapat membawa banyak
          manfaat dalam meningkatkan efektivitas dan efisiensi kinerja Anda dan
          tim. Segera daftar untuk menikmati fitur-fitur
          <span className="text-foreground"> KERJATIM</span>, download versi
          mobile di <span className="text-foreground">playstore</span> agar Anda
          dapat mengakses dimana dan kapan saja.
        </h1>

        <Image
          src="/landing/google-play.png"
          alt="kerjatim mobile app"
          width={200}
          height={75}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <Image
          src="/landing/phone-group.png"
          alt="kerjatim mobile apps"
          width={750}
          height={647}
        />
      </div>
    </Container>
  );
};
