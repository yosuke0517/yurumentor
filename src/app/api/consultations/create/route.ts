import { NextResponse } from 'next/server';
import { ConsultationFormData } from '@/features/consultations/action';
import { createServerSupabase } from '@/lib/supabase/server';

// NOTE: なぜかsessionが取得できないので、このAPIは使わない
export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabase();
    const data: ConsultationFormData = await request.json();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (!session) {
      console.error('認証されていません:', sessionError);
      return NextResponse.json(
        { error: '認証されていません' },
        { status: 401 }
      );
    }

    const { error } = await supabase.from('consultations').insert({
      title: data.title,
      description: data.description,
      consultation_date: data.consultationDate,
      creator_id: session.user.id,
    });

    if (error) {
      console.error('相談の作成に失敗しました:', error);
      return NextResponse.json(
        { error: '相談の作成に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: '相談が作成されました' },
      { status: 201 }
    );
  } catch (error) {
    console.error('予期せぬエラーが発生しました:', error);
    return NextResponse.json(
      { error: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}
