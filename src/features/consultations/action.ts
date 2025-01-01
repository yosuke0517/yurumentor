'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { Consultation } from './types';

export type ConsultationFormData = {
  title: string;
  description: string;
  consultationDate: Date;
};

export async function createConsultation(data: ConsultationFormData) {
  try {
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
      console.error('相談の作成に失敗しました:', error);
      throw new Error('相談の作成に失敗しました');
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function fetchAllConsultations() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/consultations`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('相談の取得に失敗しました:', errorText);
      throw new Error('相談の取得に失敗しました');
    }

    const consultations = await response.json();
    return consultations;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw new Error('予期せぬエラーが発生しました');
  }
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
