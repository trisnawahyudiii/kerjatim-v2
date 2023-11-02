"use client";

import { MemberSelect, SelectOptions } from "@/components/member-select";
import UnderConstruction from "@/components/under-construction";
import { User } from "@/features/workspace/core";
import { useGetWorkspaceMember } from "@/features/workspace/hooks";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [memberOptions, setMemberOptions] = useState<SelectOptions[]>([]);
  const { data, isFetching } = useGetWorkspaceMember(
    "clofl02wz0000up540nxiwlxm",
    true,
  );

  useEffect(() => {
    if (data) {
      const options: SelectOptions[] = data!.map(({ user }) => {
        return {
          user,
        };
      });

      setMemberOptions(options);
    }
  }, [data]);

  const [member, setMember] = useState<SelectOptions>();

  const handleSingleSelectChange = (values?: SelectOptions) => {
    setMember(values);
  };

  const [members, setMembers] = useState<SelectOptions[]>([]);

  const handleMultiSelectChange = (values: SelectOptions[]) => {
    setMembers(values);
  };

  return (
    <div className="flex h-with-navbar w-full flex-col items-center justify-center gap-3">
      <div className="w-[600px] rounded-xl border border-foreground p-12">
        <h1>Single Select</h1>
        <MemberSelect
          handleChange={handleSingleSelectChange}
          value={member}
          options={memberOptions}
        />
      </div>
      <div className="w-[600px] rounded-xl border border-foreground p-12">
        <h1>Multi Select</h1>
        <MemberSelect
          multiple
          handleChange={handleMultiSelectChange}
          value={members}
          options={memberOptions}
        />
      </div>
    </div>
  );
}
