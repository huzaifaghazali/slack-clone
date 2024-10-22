'use client';

import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import VerificationInput from 'react-verification-input';

import { Button } from '@/components/ui/button';
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import { useJoin } from '@/features/workspaces/api/use-join';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { useEffect, useMemo } from 'react';

const JoinPage = () => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });
  const { mutate, isPending } = useJoin();
  const router = useRouter();

  const isMember = useMemo(() => data?.isMember, [data?.isMember]);
  
  useEffect(() => {
    if (isMember) {
      router.push(`/workspace/${workspaceId}`);
    }
  }, [isMember, router, workspaceId]);

  const handleComplete = (value: string) => {
    mutate(
      { workspaceId, joinCode: value },
      {
        onSuccess: (id) => {
          router.replace(`/workspace/${id}`);
          toast.success('Joined workspace successfully!');
        },
        onError: () => {
          toast.error('Failed to join workspace!');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center '>
        <Loader className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  console.log(data);

  return (
    <div className='h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md'>
      <Image src='/logo.png' alt='logo' width={60} height={60} />
      <div className='flex flex-col gap-y-4 items-center justify-center max-w-md'>
        <div className='flex flex-col gap-y-2 items-center justify-center'>
          <h1 className='text-2xl font-bold'>Join {data?.name}</h1>
          <p className='text-lg text-muted-foreground'>
            Enter the workspace code to join
          </p>
        </div>

        <VerificationInput
          onComplete={handleComplete}
          length={6}
          classNames={{
            container: cn(
              'flex gap-2',
              isPending && 'opacity-50 cursor-not-allowed'
            ),
            character:
              'uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500',
            characterInactive: 'bg-muted',
            characterSelected: 'bg-white text-black',
            characterFilled: 'bg-white text-black',
          }}
          autoFocus
        />
      </div>
      <div className='flex gap-x-4'>
        <Button size='lg' variant='outline' asChild>
          <Link href='/'>Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
