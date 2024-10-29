'use client';

import { useGetChannel } from '@/features/channels/api/use-get-channel';
import { useChannelId } from '@/hooks/use-channel-id';
import { Loader, TriangleAlert } from 'lucide-react';
import { Header } from './header';

const ChannelId = () => {
  const channelId = useChannelId();
  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading) {
    return (
      <div className='h-full flex flex-1 items-center justify-center'>
        <Loader className='size-5 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className='h-full flex flex-1 flex-col gap-y-4 items-center justify-center'>
        <TriangleAlert className='size-5 text-muted-foreground' />
        <span className='text-sm text-muted-foreground'>Channel not found</span>
      </div>
    );
  }
  return <div className='flex flex-col h-full'>
    <Header title={channel.name} />
  </div>;
};

export default ChannelId;