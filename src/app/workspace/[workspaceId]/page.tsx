'use client';

import { useWorkspaceId } from '@/hooks/use-workspace-id';

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();

  return <div>Workspace {workspaceId}</div>;
};

export default WorkspaceIdPage;
