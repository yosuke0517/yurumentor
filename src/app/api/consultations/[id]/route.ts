import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log(`Received request for consultation ID: ${id}`);

  try {
    const supabase = await createServerSupabase();

    const { data: consultation, error } = await supabase
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
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching consultation:', error);
      return NextResponse.json(
        { error: '相談の取得に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json(consultation);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}
