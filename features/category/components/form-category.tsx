"use client";

import { ErrorMessage, useFormikContext } from "formik";
import { Input } from "@/components/ui";
import { Categories } from "../core/categories";

export const FormCategory = () => {
  const { values, errors, handleChange } = useFormikContext<Categories>();
  return (
    <div className="flex w-full flex-col gap-3">
      <label htmlFor="name" className="flex flex-col">
        Nama Kategori*
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Todo"
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
    </div>
  );
};
