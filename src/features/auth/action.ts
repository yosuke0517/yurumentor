'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

type LoginData = {
  email: string;
  password: string;
};

export async function login(data: LoginData) {
  const supabase = await createServerSupabase();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      // エラーの種類に応じて適切なメッセージを返す
      switch (error.message) {
        case 'Invalid login credentials':
          throw new Error('メールアドレスまたはパスワードが間違っています');
        case 'Email not confirmed':
          throw new Error('メールアドレスの確認が完了していません');
        default:
          throw new Error(
            'ログインに失敗しました。しばらく経ってから再度お試しください'
          );
      }
    }

    // last_login_atを更新
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase
        .from('profiles')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', session.user.id);
    }

    // エラーがない場合のみリダイレクト
    return redirect('/');
  } catch (error) {
    // エラーオブジェクトの型を確認して適切に処理
    if (error instanceof Error) {
      throw error; // カスタムエラーはそのまま再スロー
    }
    // 予期せぬエラーの場合
    throw new Error(
      '予期せぬエラーが発生しました。しばらく経ってから再度お試しください'
    );
  }
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabase();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // サインアップ処理
  const { error: signUpError } = await supabase.auth.signUp(data);

  if (signUpError) {
    console.error('アカウント作成エラー:', signUpError);
    throw signUpError;
  }

  // セッションの確認
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // プロフィールの作成
    const { error: profileError } = await supabase.from('profiles').insert({
      username: data.email,
      id: session.user.id, // user_idを明示的に設定
    });

    if (profileError) {
      console.error('プロフィール作成エラー:', profileError);
      throw profileError;
    }

    // 認証が完了している場合は相談一覧へリダイレクト
    redirect('/profiles');
  } else {
    // メール確認が必要な場合は確認ページへ
    redirect('/auth/verify');
  }
}
