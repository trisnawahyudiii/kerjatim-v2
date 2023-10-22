import { cn } from "@/lib";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export const Divider: React.FC<DividerProps> = ({
  text,
  className,
  ...props
}) => {
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-2 text-slate-500">{text}</span>
      </div>
    </div>
  );
};
