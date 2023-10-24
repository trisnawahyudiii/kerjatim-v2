"use client";

import { ErrorMessage, useFormikContext } from "formik";
import { Workspace } from "@prisma/client";
import { Button, Input } from "@/components/ui";
import Image from "next/image";

export const FormWorkspace = () => {
  const { values, errors, handleChange, handleSubmit } =
    useFormikContext<Partial<Workspace>>();

  return (
    <div className="flex w-full flex-col gap-3">
      <label htmlFor="name" className="flex flex-col">
        Nama Workspace*
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="My workspace"
          value={values.name}
          onChange={handleChange}
          className={errors.name ? "border-red-500" : ""}
        />
        <ErrorMessage
          name="name"
          component="div"
          className="mt-1 text-[13px] text-red-500"
        />
      </label>

      <label htmlFor="decription">
        Deskripsi
        <Input
          id="description"
          name="description"
          type="text"
          placeholder="Workspace description"
          value={values.description!}
          onChange={handleChange}
        />
      </label>
      <Button type="submit">Simpan</Button>
    </div>
  );
};
