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
      return false;
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
    return true;
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

type SignupData = {
  email: string;
  password: string;
};

export async function signup(data: SignupData) {
  const supabase = await createServerSupabase();

  try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (signUpError) {
      // エラーの種類に応じて適切なメッセージを返す
      switch (signUpError.message) {
        case 'User already registered':
          throw new Error('このメールアドレスは既に登録されています');
        case 'Password should be at least 6 characters':
          throw new Error('パスワードは6文字以上で入力してください');
        default:
          throw new Error(
            'アカウント作成に失敗しました。しばらく経ってから再度お試しください'
          );
      }
      return false;
    }

    // セッションの確認
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // プロフィールの作成
      const { error: profileError } = await supabase.from('profiles').insert({
        username: data.email,
        id: session.user.id,
      });

      if (profileError) {
        throw new Error('プロフィール作成に失敗しました');
      }
      return true;
    }
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      '予期せぬエラーが発生しました。しばらく経ってから再度お試しください'
    );
  }
}
