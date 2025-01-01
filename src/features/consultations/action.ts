'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { ConsultationDetail } from './types';

export type ConsultationFormData = {
  title: string;
  description: string;
  consultationDate: Date;
};

export async function createConsultationAction(data: ConsultationFormData) {
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

// TODO servicesに移動させる
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

// TODO servicesに移動させる
export async function getConsultationById(
  id: string
): Promise<ConsultationDetail | null> {
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

export async function createMatch(consultationId: string) {
  const supabase = await createServerSupabase();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('認証されていません');
  }

  const { error } = await supabase.from('matches').insert([
    {
      request_id: consultationId,
      participant_id: user.id,
      status: 'pending',
    },
  ]);

  if (error) {
    console.error('マッチング登録エラー:', error);
    throw new Error('マッチングの登録に失敗しました');
  }

  return true;
}

export async function getMatchesByConsultationId(consultationId: string) {
  const supabase = await createServerSupabase();

  try {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('request_id', consultationId);

    if (error) {
      console.error('マッチングの取得に失敗しました:', error);
      throw new Error('マッチングの取得に失敗しました');
    }

    return data;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw new Error('予期せぬエラーが発生しました');
  }
}
