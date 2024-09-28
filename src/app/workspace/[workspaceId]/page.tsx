interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = ({ params: { workspaceId } }: WorkspaceIdPageProps) => {

  return <div>Workspace {workspaceId}</div>;
};

export default WorkspaceIdPage;
