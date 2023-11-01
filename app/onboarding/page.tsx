"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  LoadingComponent,
} from "@/components/ui";
import { Form, Formik } from "formik";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { Workspaces } from "@/features/workspace/core";
import {
  FormWorkspace,
  JoinWorkspace,
  JoinWorkspaceForm,
} from "@/features/workspace/components";
import {
  useCreateWorkspace,
  useGetWorkspaceByCode,
  useJoinWorkspace,
} from "@/features/workspace/hooks";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  joinWorkspaceValidationSchema,
  workspaceValidationSchema,
} from "@/features/workspace/utilities";
import { FormBoard } from "@/features/board/components";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type ModalConfig = {
  type: "BUAT_WORKSPACE" | "GABUNG_WORKSPACE" | "CHOSING";
  open: boolean;
};

export default function OnboardingPage() {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    type: "CHOSING",
    open: true,
  });

  const { toast } = useToast();
  const router = useRouter();

  const [workspaceCode, setWorkspaceCode] = useState<string | null>(null);
  const handleSubmitCode = (values: JoinWorkspace) => {
    setWorkspaceCode(values.workspaceCode as string);
  };
  const { data, isFetching, isError, error } = useGetWorkspaceByCode(
    workspaceCode!,
    Boolean(workspaceCode!),
  );

  const handleSwitch = (values: ModalConfig) => {
    setModalConfig(values);
  };

  const closeModal = () =>
    setModalConfig(() => {
      return {
        type: "CHOSING",
        open: true,
      };
    });

  const initialBuatWorkspaceValue: Workspaces = {
    name: "",
    description: "",
  };

  const iniitialGabungValue: JoinWorkspace = {
    workspaceCode: "",
  };

  const createWorkspace = useCreateWorkspace();
  const handleCreateWorkspace = (values: Workspaces) => {
    return createWorkspace.mutate(values, {
      onSuccess: (res: any) => {
        console.log("response: ", res);
        toast({
          title: "Success",
          description: "Berhasil Membuat Workspace",
        });
        closeModal();
        router.push("/dashboard/" + res.id);
      },
    });
  };

  const joinWorkspace = useJoinWorkspace();
  const handleJoinWorkspace = (values: JoinWorkspace) => {
    return joinWorkspace.mutate(values, {
      onSuccess: (res: any) => {
        console.log("response", res);
        toast({
          title: "Success",
          description: "Berhasil bergabung dengan workspace",
        });
        router.push("/dashboard/" + res.workspaceId);
      },
      onError: (err) => {
        console.log("error", err);
        toast({
          title: "Error",
          description: "Gagal dengan workspace",
        });
        router.push("/dashboard");
      },
    });
  };

  return (
    <>
      <Dialog defaultOpen open={modalConfig.open} onOpenChange={closeModal}>
        {/* content */}
        <DialogContent className="grid h-fit min-h-[500px] w-1/2 max-w-xl gap-0 bg-background p-0 md:grid-cols-2 lg:max-w-4xl">
          <div
            className={cn(
              "col-span-1 hidden flex-col items-center justify-between gap-3 bg-zinc-200/80 p-8 text-center md:flex",
              modalConfig.type === "BUAT_WORKSPACE" ||
                modalConfig.type === "CHOSING"
                ? "bg-white"
                : "bg-zinc-200/80",
            )}
          >
            <div className="space-y-3">
              <DialogTitle className=" text-xl font-bold">
                Buat <span className="text-foreground">Workspace Baru</span>
              </DialogTitle>
              <p>
                Tingkatkan produktivitas Anda dengan membuat daftar pekerjaan
                secara efektif dan efisien
              </p>
            </div>

            {modalConfig.type === "BUAT_WORKSPACE" ? (
              <div className="flex h-full w-full justify-between text-left">
                <Formik
                  initialValues={initialBuatWorkspaceValue}
                  validationSchema={workspaceValidationSchema}
                  onSubmit={handleCreateWorkspace}
                >
                  <Form className="-h-full w-full">
                    <FormWorkspace className="h-full justify-center" />
                  </Form>
                </Formik>
              </div>
            ) : (
              <>
                <Image
                  src="/buat-workspace-ils.png"
                  alt="buat workspace baru"
                  width={200}
                  height={300}
                />

                <DialogFooter className="w-full">
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSwitch({ type: "BUAT_WORKSPACE", open: true })
                    }
                  >
                    Pilih
                  </Button>
                </DialogFooter>
              </>
            )}
          </div>
          <div
            className={cn(
              "col-span-1 hidden flex-col items-center justify-between gap-3 p-8 text-center md:flex",
              modalConfig.type === "GABUNG_WORKSPACE"
                ? "bg-white"
                : "bg-zinc-200/80",
            )}
          >
            <div className="space-y-3">
              <DialogTitle className=" text-xl font-bold">
                Bergabung Dengan <span className="text-foreground">Tim</span>
              </DialogTitle>
              <p>
                Kerjatim membangun manajemen tugas untuk memudahkan dan memantau
                pekerjaan Anda.
              </p>
            </div>

            {modalConfig.type === "GABUNG_WORKSPACE" ? (
              <div className="flex h-full w-full justify-between text-left">
                {!workspaceCode ? (
                  <>
                    <Formik
                      initialValues={iniitialGabungValue}
                      validationSchema={joinWorkspaceValidationSchema}
                      onSubmit={handleSubmitCode}
                    >
                      <Form className="flex h-full w-full flex-col items-center justify-center">
                        <JoinWorkspaceForm
                          loading={isFetching}
                          className="flex w-full flex-col gap-3"
                        />
                      </Form>
                    </Formik>
                  </>
                ) : (
                  <>
                    {isFetching ? (
                      <div className="flex h-full max-h-[514px] w-full flex-col items-center justify-center overflow-hidden">
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
                          Maaf, halaman yang Anda cari tidak ditemukan.
                          Terkadang, kehilangan adalah bagian dari perjalanan,
                          tetapi mari kita kembali ke rute yang benar. Silakan
                          gunakan navigasi untuk menemukan informasi yang Anda
                          cari atau hubungi kami jika Anda membutuhkan bantuan
                          lebih lanjut.
                        </p>

                        <Link href="/dashboard" className="flex text-end">
                          <ChevronRight /> Dashboard
                        </Link>
                      </>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <h1 className="my-5 text-xl font-semibold">
                          Bergabung dengan <span>{data?.name}</span>
                        </h1>
                        <p>
                          Selamat datang di tim kami! Kami sangat antusias untuk
                          memiliki kehadiran Anda di sini.
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
                              handleJoinWorkspace({
                                workspaceCode: data?.code!,
                              })
                            }
                          >
                            Bergabung
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <>
                <Image
                  src="/join-workspace-ils.png"
                  alt="bergabung ke workspace"
                  width={250}
                  height={300}
                />
                <DialogFooter className="w-full">
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSwitch({ type: "GABUNG_WORKSPACE", open: true })
                    }
                  >
                    Pilih
                  </Button>
                </DialogFooter>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
