'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { Consultation } from './types';

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

export async function getConsultationById(
  id: string
): Promise<Consultation | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/consultations/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('相談の取得に失敗しました:', errorText);
      return null;
    }
    const consultation = await response.json();

    return consultation;
  } catch (error) {
    console.error('Error while fetching consultation:', error);
    return null;
  }
}
