import { getConsultationById } from '@/features/consultations/action'; // 相談を取得する関数をインポート
import BackButton from '@/features/consultations/components/BackButton';
import { notFound } from 'next/navigation';
import MatchButton from '@/features/consultations/components/MatchButton';
import { createServerSupabase } from '@/lib/supabase/server';

type Props = {
  params: Promise<{ id: string }>; // paramsをPromiseとして定義
};

export default async function ConsultationDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const consultation = await getConsultationById(id);

  if (!consultation) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <BackButton />
      <h1 className="text-2xl font-bold">{consultation.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {consultation.description}
      </p>
      <MatchButton
        consultationId={id}
        createdId={consultation.creator_id}
        currentUserId={user?.id}
      />
    </div>
  );
}
