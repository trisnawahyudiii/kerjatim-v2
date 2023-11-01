import { Button, LoadingComponent } from "@/components/ui";
import { JoinWorkspace } from ".";
import { Workspaces } from "../core";
import Image from "next/image";
import { ErrorResponse } from "@/types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type ConfirmJoinWorkspaceProps = {
  workspace?: Workspaces;
  isFething?: boolean;
  isError?: boolean;
  error?: ErrorResponse | null;
  handleJoinWorkspace: (values: JoinWorkspace) => void;
};

export const ConfirmJoinWorkspace = ({
  workspace,
  isError,
  isFething,
  error,
  handleJoinWorkspace,
}: ConfirmJoinWorkspaceProps) => {
  return (
    <>
      <div className="grid h-fit w-1/2 max-w-xl rounded-xl bg-background p-0 shadow-custom md:grid-cols-2 lg:max-w-4xl">
        <div className="col-span-1 flex flex-col items-center justify-center gap-3 p-5">
          {isFething ? (
            <div className="flex h-full max-h-[514px] w-full items-center justify-center overflow-hidden">
              <LoadingComponent className="scale-50" />
            </div>
          ) : isError ? (
            <>
              <h1 className="my-5 text-xl font-semibold">
                Oops! Terjadi Kesalahan
              </h1>
              <pre className="text-slate-400">
                Detail: {error?.response?.data.message}
              </pre>
              <p>
                Maaf, halaman yang Anda cari tidak ditemukan. Terkadang,
                kehilangan adalah bagian dari perjalanan, tetapi mari kita
                kembali ke rute yang benar. Silakan gunakan navigasi untuk
                menemukan informasi yang Anda cari atau hubungi kami jika Anda
                membutuhkan bantuan lebih lanjut.
              </p>

              <Link href="/dashboard" className="flex text-end">
                <ChevronRight /> Dashboard
              </Link>
            </>
          ) : (
            <>
              <h1 className="my-5 text-xl font-semibold">
                Bergabung dengan <span>{workspace?.name}</span>
              </h1>
              <p>
                Selamat datang di tim kami! Kami sangat antusias untuk memiliki
                kehadiran Anda di sini.
              </p>

              <div className="grid w-full grid-cols-2 gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-3"
                >
                  <ChevronRight className="h-6 w-6" /> Batal
                </Link>
                <Button
                  className="col-span-1 w-full"
                  onClick={() =>
                    handleJoinWorkspace({ workspaceCode: workspace?.code! })
                  }
                >
                  Bergabung
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="col-span-1 hidden flex-col items-center justify-center gap-3 bg-zinc-200/80 p-8 text-center md:flex">
          <h1 className=" text-xl font-bold">
            Membuat Rencana Dengan <span className="text-foreground">Tim</span>
          </h1>
          <p>
            Kerjatim membangun manajemen tugas untuk memudahkan dan memantau
            pekerjaan Anda.
          </p>
          <Image
            src="/join-workspace-ils.png"
            alt="bergabung ke workspace"
            width={350}
            height={350}
          />
        </div>
      </div>
    </>
  );
};
