import { useFormikContext, ErrorMessage } from "formik";
import { Keyboard, X } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { LoadingSpiner } from "@/components/loading-spiner";
import React from "react";
import { cn } from "@/lib";

export type JoinWorkspace = {
  workspaceCode: string | string[];
};

interface JoinWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  loading: boolean;
}

export const JoinWorkspaceForm = ({
  loading,
  className,
  ...props
}: JoinWorkspaceProps) => {
  const { values, setValues, handleChange, handleBlur, errors } =
    useFormikContext<JoinWorkspace>();

  return (
    <div className={cn("", className)} {...props}>
      <div className="relative w-full">
        <Keyboard className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-slate-400" />
        <Input
          type="text"
          name="workspaceCode"
          placeholder="Workspace Code"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.workspaceCode}
          className="pl-12"
        />
        {values.workspaceCode ? (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 m-0 -translate-y-1/2"
            onClick={() => setValues({ workspaceCode: "" })}
          >
            <X className="h-4 w-4 text-slate-400" />
          </Button>
        ) : null}
      </div>
      {errors.workspaceCode && (
        <ErrorMessage
          name="workspaceCode"
          component="div"
          className="mt-1 text-[13px] text-red-500"
        />
      )}
      <Button type="submit" disabled={!values.workspaceCode} className="w-full">
        {loading ? <LoadingSpiner /> : "Join"}
      </Button>
    </div>
  );
};
