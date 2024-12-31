import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  console.log('GET request received for consultations');

  try {
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
      console.error('Error fetching consultations:', error);
      return NextResponse.json(
        { error: '相談の取得に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json(consultations);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}
