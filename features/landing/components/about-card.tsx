import { cn } from "@/lib";
import Image from "next/image";

interface AboutCardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  text: string;
  image: string;
  label: string;
}

export const AboutCard = ({
  image,
  label,
  text,
  className,
  ...props
}: AboutCardProps) => {
  return (
    <div
      className={cn(
        "group relative col-span-1 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-slate-50/90 p-12 shadow-xl",
        className,
      )}
      style={{}}
      {...props}
    >
      <Image src={image} alt={label} width={100} height={100} />
      <p className="text-xl font-semibold capitalize">{text}</p>
      <div className="absolute bottom-0 left-0 right-0 top-[0] flex translate-y-[100%] items-center justify-center bg-background/90 p-5 text-center text-xl font-medium text-black transition duration-700 ease-out group-hover:-translate-y-[0] group-hover:transform">
        <p>{label}</p>
      </div>
    </div>
  );
};
