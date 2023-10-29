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
  SelectItem,
} from "@/components/ui/select";

import { Lock, ShieldCheck } from "lucide-react";

export const FormBoard = () => {
  const { values, errors, handleChange, setValues } =
    useFormikContext<Partial<Boards>>();

  return (
    <div className="flex w-full flex-col gap-3">
      <label htmlFor="name" className="flex flex-col">
        Nama Board*
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="My App Project"
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

      <div>
        <span>Privasi*</span>
        <Select
          name="isPublic"
          value={String(values.isPublic)}
          onValueChange={(value) =>
            setValues({ ...values, isPublic: Boolean(value) })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Privacy" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">
                <span className="flex items-center gap-3">
                  <ShieldCheck />
                  Public
                </span>
              </SelectItem>
              <SelectItem value="false">
                <span className="flex items-center gap-3">
                  <Lock /> Private
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ErrorMessage
          name="isPublic"
          component="div"
          className="mt-1 text-[13px] text-red-500"
        />
      </div>
      <Button type="submit">Simpan</Button>
    </div>
  );
};
