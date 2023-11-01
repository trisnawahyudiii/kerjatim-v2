import { Button } from "@/components/ui";

type PageProps = {
  params: {
    workspaceId: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="h-with-navbar flex w-full items-center justify-center">
      <h1>Pilih Board</h1>
    </div>
  );
}
