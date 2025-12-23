'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  userName?: string | null;
}

export default function Navbar({ userName }: NavbarProps) {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Task Manager Pro</h1>
          <p className="text-sm text-muted-foreground">Manage your tasks efficiently</p>
        </div>
        <div className="flex items-center gap-4">
          {userName && (
            <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
          )}
          <Button onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
