'use client';

import { Button } from '@/components/ui/button';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  function handleLogout() {
    signOut().finally(() => {
      router.refresh();
    });
  }

  return (
    <div>
      Logged In
      <Button onClick={() => handleLogout()}>Sign Out</Button>
    </div>
  );
}
