'use client';

import { Button } from '@/components/ui/button';
import { useAuthActions } from '@convex-dev/auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  function handleLogout() {
    router.refresh();
    signOut();
    redirect('/auth');
  }

  return (
    <div>
      Logged In
      <Button onClick={() => handleLogout()}>Sign Out</Button>
    </div>
  );
}
