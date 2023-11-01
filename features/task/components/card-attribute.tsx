import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui";
import { Icon } from "@radix-ui/react-select";
import { count } from "console";

type TaskAttributeProps = {
  icon: React.ReactNode;
  count?: number | string;
  text: string;
};

export const TaskAttribute: React.FC<TaskAttributeProps> = ({
  icon,
  text,
  count,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center justify-center gap-1">
        {icon} {count}
      </TooltipTrigger>
      <TooltipContent side="bottom">{text}</TooltipContent>
    </Tooltip>
  );
};
