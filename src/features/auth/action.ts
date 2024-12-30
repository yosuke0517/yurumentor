'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = await createServerSupabase();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (error) {
      console.error('Supabaseログインエラー:', error);
      return;
    }
    redirect('/');
  } catch (error) {
    console.error('ログインに失敗しました', error);
    return;
  }
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabase();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: userData, error } = await supabase.auth.signUp(data);

  console.log(userData);
  // supabaseのprofilesにデータを追加
  const { error: profileError } = await supabase.from('profiles').insert({
    username: data.email,
  });

  if (error || profileError) {
    console.error('アカウント作成エラー:', error, profileError);
    return;
  }

  redirect('/');
}
