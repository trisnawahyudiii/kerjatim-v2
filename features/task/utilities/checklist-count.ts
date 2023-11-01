import { Checklist } from "@prisma/client";

export const checklistCount = (checklist: Partial<Checklist>[]): string => {
  let checked = 0;

  for (let i = 0; i < checklist.length; i++) {
    if (checklist[i].isChecked) checked++;
  }

  return `${checked}/${checklist.length}`;
};
