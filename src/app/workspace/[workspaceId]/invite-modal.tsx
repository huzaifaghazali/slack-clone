import { CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { toast } from 'sonner';

interface InvitesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InvitesModalProps) => {
  const workspaceId = useWorkspaceId();

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;

    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success('Invite link copied to clipboard');
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {name}</DialogTitle>
          <DialogDescription>
            Use the code below the invite people to your workspace
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-y-4 items-center justify-center py-10'>
          <p className='text-4xl font-bold tracking-widest uppercase'>
            {joinCode}
          </p>
          <Button variant='ghost' size='sm' onClick={handleCopy}>
            Copy link
            <CopyIcon className='size-5 ml-2' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
