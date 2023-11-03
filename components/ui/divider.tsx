import { cn } from "@/lib";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  dir?: "vertical" | "horizontal";
}

export const Divider: React.FC<DividerProps> = ({
  text,
  dir,
  className,
  ...props
}) => {
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <span
          className={cn(
            dir === "vertical" ? "w-full border-t" : "my-2 h-full border-r",
          )}
        />
      </div>
      {text ? (
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500">{text}</span>
        </div>
      ) : null}
    </div>
  );
};
