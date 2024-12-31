'use server';

import { createServerSupabase } from '@/lib/supabase/server';

export type ConsultationFormData = {
  title: string;
  description: string;
  consultationDate: Date;
};

export async function createConsultation(data: ConsultationFormData) {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('認証されていません');
  }

  const { error } = await supabase.from('consultations').insert({
    title: data.title,
    description: data.description,
    consultation_date: data.consultationDate,
    creator_id: session.user.id,
  });

  if (error) {
    throw new Error('相談の作成に失敗しました');
  }

  return true;
}

export async function getConsultations() {
  const supabase = await createServerSupabase();

  const { data: consultations, error } = await supabase
    .from('consultations')
    .select(
      `
      *,
      creator:profiles (
        id,
        display_name,
        birthdate,
        gender,
        profile_image_url
      )
    `
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error('相談の取得に失敗しました');
  }

  return consultations;
}
