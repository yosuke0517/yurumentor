import { cookies, headers } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { type User } from '@/components/UsersGrid';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: '田中 太郎',
    age: 28,
    gender: '男性',
    location: '東京都',
    bio: '勉強の習慣化に苦戦中です。毎日の進捗を見守ってくれる人を探しています！',
    preferredMode: 'online',
  },
  {
    id: '2',
    name: '佐藤 美咲',
    age: 25,
    gender: '女性',
    location: '大阪府',
    bio: '資格試験の勉強をサボりがちなので、一緒に頑張れる仲間を募集中です。',
    preferredMode: 'offline',
  },
  // ... 残りのユーザーデータも追加
];

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return Response.json(MOCK_USERS);
}
