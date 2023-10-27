import { Button, Container, Input } from "@/components/ui";
import { footerConfig } from "@/config/navigations";
import Link from "next/link";

import { FaFacebookF, FaTwitter } from "react-icons/fa";
import {
  BiLogoInstagramAlt,
  BiLogoLinkedin,
  BiLogoYoutube,
} from "react-icons/bi";

export const LandingFooter = () => {
  return (
    <div className="bg-gradient-to-br from-foreground to-pr-blue-2 pt-5 text-white">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-24">
        <div className="col-span-1 flex flex-col gap-3 lg:col-span-4">
          <h1 className="text-xl">
            <b>Kerjatim</b>
          </h1>

          <p>
            Jl. Abadi Praja I Blok I-A 10/27 Sepinggan, Balikpapan Selatan,
            Balikpapan City, East Kalimantan 76116 Media Kreasi Abadi.
          </p>

          <div>
            <p>Phone: +628115390600</p>
            <p>Email : Kerjatim.mka@gmail.com</p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-3 lg:col-span-3">
          <h1 className="text-xl">
            <b>Usefull Links</b>
          </h1>
          {footerConfig.map(({ id, name, href }, index) => (
            <Link key={index} id={String(id)} href={href}>
              {name}
            </Link>
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-3 lg:col-span-5">
          <h1 className="text-xl">
            <b>Newsletter</b>
          </h1>

          <div className="grid grid-cols-3">
            <div className="col-span-2 text-base">
              <p>
                Berlangganan newsletter kami untuk mendapatkan info dan promo
                terbaru dari kami
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row ">
            <Input
              type="text"
              placeholder="Masukkan Email"
              className="w-full bg-white lg:w-2/3"
            />
            <Button
              variant="default"
              className="w-full bg-[#FFCE51] text-black/90 hover:bg-yellow-500 lg:w-1/3"
            >
              Berlangganan
            </Button>
          </div>
        </div>
      </Container>
      <Container>
        <div className="w-100 my-4 flex items-center justify-center gap-3 text-xl text-white">
          <Link href="#">
            <FaFacebookF />
          </Link>
          <Link href="#">
            <FaTwitter />
          </Link>
          <Link href="#">
            <BiLogoInstagramAlt />
          </Link>
          <Link href="#">
            <BiLogoLinkedin />
          </Link>
          <Link href="#">
            <BiLogoYoutube />
          </Link>
        </div>
      </Container>
      <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <div className="w-100 flex items-center justify-center py-5">
        <p>Copyright © 2023 Kerjatim | All Rights Reserved </p>
      </div>
    </div>
  );
};
