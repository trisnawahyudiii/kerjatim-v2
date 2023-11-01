import { Button, Checkbox, Input } from "@/components/ui";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { AuthPayload } from "../core";
import Link from "next/link";
import { LoadingSpiner } from "@/components/loading-spiner";

type LoginFormProps = {
  isLoading: boolean;
};

export const LoginForm = ({ isLoading }: LoginFormProps) => {
  const { values, errors, touched, handleChange } =
    useFormikContext<AuthPayload>();

  return (
    <div className="flex flex-col gap-1">
      <Input
        name="email"
        id="email"
        type="email"
        placeholder="name@example.com"
        value={values.email}
        onChange={handleChange}
        className={`border ${
          errors.email
            ? "border-red-500 placeholder:text-red-500"
            : "border-gray-300"
        }`}
      />
      <ErrorMessage
        name="email"
        component="div"
        className="text-[12px] text-red-500"
      />

      <div className="flex items-center space-x-2">
        <Field type="checkbox" id="terms" name="terms" />
        <label htmlFor="terms" className="text-[14px]">
          Saya setuju dengan{" "}
          <Link
            href="/site-policy/kerjatim-term"
            className="font-semibold text-pr-blue-2"
          >
            Syarat & Ketentuan
          </Link>{" "}
          dan
          <Link
            href="/site-policy/kerjatim-privacy-statement"
            className="font-semibold text-pr-blue-2"
          >
            {" "}
            Kebijakan Privasi
          </Link>
        </label>
      </div>
      <ErrorMessage
        name="terms"
        component="div"
        className="text-[12px] text-red-500"
      />
      <Button type="submit" className="mt-3" disabled={isLoading}>
        {isLoading ? <LoadingSpiner /> : "SignIn"}
      </Button>
    </div>
  );
};
