import { cn } from "lib";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("container mx-auto px-4 sm:px-6 md:px-8 py-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};
