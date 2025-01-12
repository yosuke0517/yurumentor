import { createServerSupabase } from '@/lib/supabase/server';
import { MatchedUser } from './config';

export async function fetchMatchedUsers(
  userId: string
): Promise<MatchedUser[]> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('matches')
    .select(
      `
      id,
      status,
      created_at,
      request_id,
      consultations!inner (
        id,
        title,
        description,
        consultation_date,
        creator_id
      ),
      profiles!inner (
        id,
        display_name,
        profile_image_url,
        gender,
        birthdate
      )
    `
    )
    .eq('consultations.creator_id', userId)
    .order('created_at', { ascending: false })
    .returns<MatchedUser[]>();

  if (error) {
    console.error('Error:', error);
    throw new Error('マッチングの取得に失敗しました');
  }

  return data;
}
