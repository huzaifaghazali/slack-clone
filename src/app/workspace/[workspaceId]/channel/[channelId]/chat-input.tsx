import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import Quill from 'quill';
import { toast } from 'sonner';

import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useChannelId } from '@/hooks/use-channel-id';

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

interface ChatInputProps {
  placeholder: string;
}

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);

  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const handleSubmit = async () => {};

  return (
    <div className='w-full px-5'>
      <Editor
        key={editorKey}
        placeholder={placeholder}
        disabled={isPending}
        onSubmit={handleSubmit}
        innerRef={editorRef}
      />
    </div>
  );
};
