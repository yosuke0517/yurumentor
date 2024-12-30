import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Supabaseクライアントの初期化（非同期のcookies()を使用）
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({
      cookies: async () => cookieStore,
    });

    // セッションの確認
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      return NextResponse.json(
        { error: 'セッションの確認中にエラーが発生しました' },
        { status: 500 }
      );
    }

    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const MOCK_USERS = [
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

    return NextResponse.json(MOCK_USERS);
  } catch {
    return NextResponse.json(
      { error: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}
