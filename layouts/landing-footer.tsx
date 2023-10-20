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
    <div className="bg-pr-blue-2 text-white">
      <Container className="grid grid-cols-12 gap-24">
        <div className="col-span-5 flex flex-col gap-3">
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
        <div className="col-span-2 flex flex-col gap-3">
          <h1 className="text-xl">
            <b>Usefull Links</b>
          </h1>
          {footerConfig.map(({ id, name, href }) => (
            <Link id={String(id)} href={href}>
              {name}
            </Link>
          ))}
        </div>
        <div className="col-span-5 flex flex-col gap-3">
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
          <div className="grid grid-cols-3 gap-3">
            <Input
              type="text"
              placeholder="Masukkan Email"
              className="col-span-2"
            />
            <Button
              variant="default"
              className="bg-[#FFCE51] text-black/90 hover:bg-yellow-500"
            >
              Berlangganan
            </Button>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex items-center justify-center w-100 text-white text-xl gap-3 my-4">
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
      <div className="py-3 w-100 flex items-center justify-center">
        <p>Copyright © 2023 Kerjatim | All Rights Reserved </p>
      </div>
    </div>
  );
};
