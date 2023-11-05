import { Button } from "@/components/ui";

type PageProps = {
  params: {
    workspaceId: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="flex h-with-navbar w-full items-center justify-center">
      <div className="w-[600px] rounded-xl border border-foreground p-12">
        <h1 className="text-2xl font-semibold">Pilih Board</h1>
      </div>
    </div>
  );
}
