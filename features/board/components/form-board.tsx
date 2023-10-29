"use client";

import { ErrorMessage, useFormikContext } from "formik";
import { Button, Input } from "@/components/ui";
import { Boards } from "../core";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

export const FormBoard = () => {
  const { values, errors, handleChange, handleSubmit } =
    useFormikContext<Partial<Boards>>();

  return (
    <div className="flex w-full flex-col gap-3">
      <label htmlFor="name" className="flex flex-col">
        Nama Board*
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

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Privacy" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Privacy</SelectLabel>
            <SelectItem value="1">Public</SelectItem>
            <SelectItem value="0">Private</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ErrorMessage
        name="isPublic"
        component="div"
        className="mt-1 text-[13px] text-red-500"
      />
      <Button type="submit">Simpan</Button>
    </div>
  );
};
