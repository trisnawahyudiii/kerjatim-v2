import Image from "next/image";
import { Formik, Form } from "formik";
import { JoinWorkspace, JoinWorkspaceForm } from ".";
import { joinWorkspaceValidationSchema } from "../utilities";

type JoinWorkspaceModalProps = {
  initialValue: JoinWorkspace;
  loading: boolean;
  handleSubmit: (values: JoinWorkspace) => void;
};

export const JoinWorkspaceModal = ({
  initialValue,
  loading,
  handleSubmit,
}: JoinWorkspaceModalProps) => {
  return (
    <div className="grid h-fit w-1/2 max-w-xl rounded-xl bg-background p-0 shadow-custom md:grid-cols-2 lg:max-w-4xl">
      <div className="col-span-1 flex flex-col items-center justify-center gap-3 p-5">
        <h1 className="my-5 text-xl font-semibold">Bergabung Bersama Tim</h1>
        <Formik
          initialValues={initialValue}
          validationSchema={joinWorkspaceValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex w-full flex-col gap-3">
            <JoinWorkspaceForm loading={loading} />
          </Form>
        </Formik>
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
  );
};
