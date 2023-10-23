"use client";

import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  Button,
} from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

type VerifyRequestDialogProps = {
  show: boolean;
  onClose: () => void;
};

export const VerifyRequestDialog: React.FC<VerifyRequestDialogProps> = ({
  show,
  onClose,
}) => {
  return (
    <>
      <Dialog open={show} onOpenChange={onClose}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent className="flex h-[450px] w-[450px] flex-col items-center justify-center gap-5 bg-white p-12 text-center">
            <Image
              src="/email-sent-ils.png"
              alt="email sent"
              width={250}
              height={110}
            />
            <h1 className="text-xl font-semibold">Silahkan Cek Email Anda</h1>
            <p className="text-slate-500">
              Link verifikasi telah dikirmkan ke e-mail Anda. Segera cek folder
              inbox/spam e-mail agar bisa melanjutkan proses selanjutnya.
            </p>
            <Link href="/" className="w-full">
              <Button onClick={onClose} className="w-full">
                Dashboard
              </Button>
            </Link>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};
