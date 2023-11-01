"use client";
import { Button, Divider, Input } from "@/components/ui";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Form, Formik } from "formik";
import { authValidationSchema } from "@/features/auth/utilities";
import { AuthPayload } from "@/features/auth/core";
import Image from "next/image";
import { LoginForm, VerifyRequestDialog } from "@/features/auth/components";
import { useState, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";

type AuthenticatePageProps = {
  searchParams?: Record<"verify-request", string>;
};

export default function Authenticate({ searchParams }: AuthenticatePageProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal((prev) => !prev);
  };

  const initialValue: AuthPayload = {
    email: "",
    terms: false,
  };

  const handleAuthSubmit = (values: AuthPayload) => {
    setLoading(true);
    return signIn("email", {
      email: values.email,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  useEffect(() => {
    if (searchParams?.["verify-request"]) {
      setShowModal(() => (searchParams?.["verify-request"] ? true : false));
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center gap-3 text-center md:w-1/2">
        <Image
          src="/logo-kerjatim.png"
          alt="logo kerjatim"
          width={212}
          height={100}
        />
        <p className="text-slate-500">
          Masukkan alamat email Anda untuk masuk ke akun Anda
        </p>
      </div>
      <div className="flex flex-col gap-5 md:w-3/4 xl:w-1/2">
        <Formik
          initialValues={initialValue}
          validationSchema={authValidationSchema}
          onSubmit={handleAuthSubmit}
        >
          <Form>
            <LoginForm isLoading={loading} />
          </Form>
        </Formik>

        <Divider text="or continue with" />

        <Button
          variant="outline"
          size="lg"
          onClick={() =>
            signIn("google", { redirect: true, callbackUrl: "/dashboard" })
          }
          className="flex items-center justify-center gap-3 text-base"
        >
          <FcGoogle /> <p>Google</p>
        </Button>
      </div>

      {searchParams?.["verify-request"] && (
        <VerifyRequestDialog show={showModal} onClose={closeModal} />
      )}
    </div>
  );
}
