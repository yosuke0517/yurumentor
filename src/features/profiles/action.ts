'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { type ProfileFormValues } from './ProfileForm';

export async function updateProfile(data: ProfileFormValues) {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/login');
    return;
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: data.display_name,
      gender: data.gender,
      bio: data.bio,
      birthdate: data.birthdate,
      last_name_kanji: data.last_name_kanji,
      first_name_kanji: data.first_name_kanji,
      last_name_kana: data.last_name_kana,
      first_name_kana: data.first_name_kana,
      updated_at: new Date().toISOString(),
    })
    .eq('id', session.user.id);

  if (error) {
    console.error('プロフィール更新エラー:', error);
    return;
  }

  redirect('/');
}
