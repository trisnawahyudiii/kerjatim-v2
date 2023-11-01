import { Container } from "@/components/ui";
import { keunggulanConfig } from "../constant/keunggulan-config";
import Image from "next/image";

export const Keunggulan = () => {
  return (
    <div className="relative my-36 flex min-h-[400px] w-full bg-gradient-to-br from-foreground to-pr-blue-2">
      <Container className="relative flex min-h-[400px] flex-col lg:flex-row">
        <div className="flex items-center justify-center p-12 text-center text-4xl font-semibold text-white lg:w-1/4">
          <p>Keunggulan Kerjatim</p>
        </div>

        <div className="absolute -bottom-[50px] -top-[50px] right-[50%] hidden w-1/4 items-center justify-center lg:flex">
          <Image
            src="/landing/iphone.png"
            alt="mobile kerjatim app"
            width={240}
            height={400}
          />
        </div>

        <div className="-bottom-[50px] -top-[50px] right-0 mb-12 flex items-center justify-center pl-16 pr-10 lg:absolute lg:mb-0 lg:w-1/2 ">
          <div className="flex flex-col gap-8">
            {keunggulanConfig.map((item, index) => (
              <div
                key={index}
                className="relative flex h-[70px] w-full items-center rounded-xl bg-slate-50/95 px-16 py-4 shadow-xl"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  width={80}
                  height={80}
                  className="absolute -left-[40px] top-[50%] -translate-y-[50%]"
                />
                <p className="text-xl font-semibold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
