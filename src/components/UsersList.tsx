// Server Component
import { headers } from 'next/headers';
import { UsersGrid, type User } from './UsersGrid';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function getUsers() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${baseUrl}/api/users`, {
    cache: 'no-store',
    headers: Object.fromEntries((await headers()).entries()), // NOTE: headersをリクエストヘッダーに含めることで、サーバー側でセッションを取得できる
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch users: ${error}`);
  }
  return res.json();
}

export default async function UsersList() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login'); // 未認証ユーザーをログインページへリダイレクト
  }

  const users: User[] = await getUsers();
  return <UsersGrid users={users} />;
}
