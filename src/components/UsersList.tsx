// Server Component
import { UsersGrid, type User } from './UsersGrid';

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
  {
    id: '3',
    name: '鈴木 健一',
    age: 32,
    gender: '男性',
    location: '福岡県',
    bio: 'プログラミング学習中。モチベーション維持のために、進捗報告できる人を探しています。',
    preferredMode: 'online',
  },
  {
    id: '4',
    name: '山田 優子',
    age: 30,
    gender: '女性',
    location: '神奈川県',
    bio: 'TOEIC900点を目指して勉強中。英語学習の習慣化のために、互いに励まし合える方募集！',
    preferredMode: 'offline',
  },
  {
    id: '5',
    name: '伊藤 直樹',
    age: 27,
    gender: '男性',
    location: '愛知県',
    bio: '公認会計士試験の勉強中。日々の学習記録を共有し、モチベーションを高めたいです。',
    preferredMode: 'online',
  },
];

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function UsersList() {
  await sleep(2000);
  return <UsersGrid users={MOCK_USERS} />;
}
