import { Button } from '@/components/ui/button';
import { getConsultationById } from '@/features/consultations/action'; // 相談を取得する関数をインポート
import BackButton from '@/features/consultations/components/BackButton';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>; // paramsをPromiseとして定義
};

export default async function ConsultationDetailPage({ params }: Props) {
  const { id } = await params;
  console.log('Consultation ID:', id);

  const consultation = await getConsultationById(id);

  if (!consultation) {
    notFound(); // 相談が見つからない場合は404ページを表示
  }

  return (
    <div className="container mx-auto p-4">
      <BackButton />
      <h1 className="text-2xl font-bold">{consultation.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {consultation.description}
      </p>
      <Button className="mt-4">相談に乗る</Button>
    </div>
  );
}
