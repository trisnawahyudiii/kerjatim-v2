import { FieldArray, useFormikContext } from "formik";
import { BoardMemberPayload } from "../core";
import { WorkspaceUser } from "@/features/workspace/core";
import { Select } from "@/components/ui/select";

type BoardMemberFormProps = {
  workspaceMember: WorkspaceUser;
};

export const BoardMemberForm = ({ workspaceMember }: BoardMemberFormProps) => {
  const { values, setValues } = useFormikContext<BoardMemberPayload>();
  console.log(values);

  return (
    <>
      {/* selected user */}
      <div></div>

      {/* select user */}
      <div></div>
    </>
  );
};
