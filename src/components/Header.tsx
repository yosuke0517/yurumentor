'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

type HeaderProps = {
  user: User | null;
  matchCount?: number;
};

export function Header({ user, matchCount = 0 }: HeaderProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const displayCount = matchCount > 99 ? '99+' : matchCount.toString();

  return (
    <header className="relative border-b bg-gradient-to-r from-white via-orange-50/30 to-pink-50/30">
      <div className="bg-grid-orange/[0.03] absolute inset-0 bg-[size:20px_20px]" />
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-rose-400 bg-clip-text font-mplus text-xl font-bold text-transparent transition-all duration-300 hover:from-orange-500 hover:via-pink-600 hover:to-rose-500">
            ゆるメンター
          </span>
        </Link>

        <nav className="flex items-center space-x-4">
          {user && (
            <Link href="/matches" className="relative p-2">
              <Heart className="h-6 w-6 fill-pink-500 text-pink-500 transition-colors hover:fill-pink-400 hover:text-pink-400" />
              {matchCount > 0 && (
                <Badge variant="counter">{displayCount}</Badge>
              )}
            </Link>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full ring-2 ring-white/80 transition-all hover:ring-orange-200"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url ?? ''}
                      alt={user.user_metadata?.full_name ?? ''}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-orange-50 to-pink-50 font-medium text-orange-600">
                      {user.user_metadata?.full_name?.[0] ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 animate-in fade-in-0 zoom-in-95"
                align="end"
              >
                <DropdownMenuItem className="flex flex-col items-start p-3">
                  <span className="font-medium text-orange-950">
                    {user.user_metadata?.full_name ?? 'ユーザー'}
                  </span>
                  <span className="text-sm text-orange-600/60">
                    {user.email}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="group relative overflow-hidden bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg"
            >
              <Link href="/login">
                <span className="relative z-10">ログイン</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
