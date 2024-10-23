'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateChannelModal } from '../store/use-create-channel-modal';
import { useCreateChannel } from '../api/use-create-channel';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useRouter } from 'next/navigation';

export const CreateChannelModal = () => {
  const workspaceId = useWorkspaceId();
  const [name, setName] = useState('');
  const [open, setOpen] = useCreateChannelModal();
  const router = useRouter();
  const { mutate, isPending } = useCreateChannel();

  const handleClose = () => {
    setName('');
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '-').toLowerCase();
    setName(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name, workspaceId },
      {
        onSuccess: (id) => {
          toast.success('Channel created');
          router.push(`/workspace/${workspaceId}/channel/${id}`);
          handleClose();
        },
        onError: () => {
          toast.error('Failed to create channel');
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
          <DialogDescription>
            Create a new channel to interact.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            value={name}
            onChange={handleChange}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder={`e.g. plan-budget`}
          />
          <div className='flex justify-end'>
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
