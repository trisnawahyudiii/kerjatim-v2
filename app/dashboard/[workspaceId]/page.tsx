type PageProps = {
  params: {
    workspaceId: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <>
      <p>Workspace Id : {params.workspaceId}</p>
    </>
  );
}
