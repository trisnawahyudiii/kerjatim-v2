import { BoardSidebar } from "@/features/board/components/board-sidebar";

type LayoutProps = {
  children: React.ReactNode;
  params?: {
    workspaceId?: string;
  };
};
export default function Layout({ children, params }: LayoutProps) {
  return (
    <>
      <BoardSidebar workspaceId={params?.workspaceId!} />
      {children}
    </>
  );
}
