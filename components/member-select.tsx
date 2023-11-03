"use client";

import { User } from "@/features/workspace/core";
import { cn } from "@/lib";
import React, { FC, useState } from "react";
import { Avatar, Button, Divider } from "./ui";
import { ChevronDown, X } from "lucide-react";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export type SelectOptions = {
  user: User;
};

export type MultipleSelectProps = {
  multiple: true;
  value: SelectOptions[];
  handleChange: (value: SelectOptions[]) => void;
};

export type SingleSelectProps = {
  multiple?: false;
  value?: SelectOptions;
  handleChange: (value: SelectOptions | undefined) => void;
};

export type MemberSelectProps = {
  options: SelectOptions[];
  placeholder?: string;
} & (SingleSelectProps | MultipleSelectProps);

export const MemberSelect: FC<MemberSelectProps> = ({
  options,
  value,
  multiple,
  handleChange,
  placeholder = "Select option...",
  ...props
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleShowOptions = () => setShowOptions((prev) => !prev);

  const clearOptions = () => {
    multiple ? handleChange([]) : handleChange(undefined);
  };
  const selectOption = (option: SelectOptions) => {
    if (multiple) {
      if (value?.includes(option)) {
        handleChange(value.filter((item) => item != option));
      } else {
        handleChange([...value, option]);
      }
    } else {
      if (value !== option) handleChange(option);
    }
  };

  const isOptionSelected = (option: SelectOptions) => {
    return multiple ? value.includes(option) : value === option;
  };

  return (
    <div
      className={cn(
        "relative flex h-10 w-full cursor-pointer rounded-md border border-input bg-foreground/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      )}
      {...props}
      onClick={handleShowOptions}
    >
      <span className="flex items-center gap-2 text-muted-foreground ">
        {multiple ? (
          value.length !== 0 ? (
            <div className="flex flex-1 flex-wrap items-center gap-1">
              {value.map((option) => (
                <Avatar className="h-7 w-7" key={option.user.id}>
                  <AvatarImage
                    src={option.user.image}
                    alt={option.user.email}
                  />
                  <AvatarFallback className="flex items-center justify-center text-center">
                    {option?.user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          ) : (
            placeholder
          )
        ) : value ? (
          <>
            <Avatar className="h-7 w-7">
              <AvatarImage src={value?.user.image} alt={value?.user.email} />
              <AvatarFallback className="flex items-center justify-center text-center">
                {value?.user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p>{value?.user.email}</p>
          </>
        ) : (
          placeholder
        )}
      </span>
      <div className="absolute right-0 top-1/2 m-0 flex -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-foreground/10"
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
        >
          <X className="h-4 w-4 text-slate-400" />
        </Button>
        <Divider dir="horizontal" />
        <Button variant="ghost" size="icon" className="hover:bg-foreground/10">
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-400 transition duration-300",
              showOptions ? "" : "-rotate-180",
            )}
          />
        </Button>
      </div>

      <ul
        className={cn(
          "absolute left-0 right-0 top-full mt-1 max-h-60 rounded-md border border-input bg-slate-100 px-3 py-2",
          showOptions ? "flex flex-col gap-1" : "hidden",
        )}
      >
        {options.map((option) => (
          <li
            key={option.user.id}
            className={cn(
              "flex items-center gap-2 rounded-md bg-foreground/10 px-3 py-2 hover:bg-foreground/80 hover:text-white",
              isOptionSelected(option) ? "bg-foreground text-white" : "",
            )}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setShowOptions(false);
            }}
          >
            <Avatar className="h-7 w-7">
              <AvatarImage src={option.user.image} alt={option.user.email} />
              <AvatarFallback className="flex items-center justify-center text-center">
                {option.user?.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {option.user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
