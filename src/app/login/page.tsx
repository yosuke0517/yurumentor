'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // もしUIライブラリを使用している場合

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">ログイン</h1>
          <p className="mt-2 text-gray-600">アカウントでログインしてください</p>
        </div>

        <Button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full"
        >
          Googleでログイン
        </Button>
      </div>
    </div>
  );
}
