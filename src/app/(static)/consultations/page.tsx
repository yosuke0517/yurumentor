import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ConsultationList } from '@/features/consultations/ConsultationList';
import { fetchAllConsultations } from '@/features/consultations/action';

export default async function ConsultationsPage() {
  const consultations = await fetchAllConsultations();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">相談一覧</h1>
        <Link href="/consultations/new">
          <Button>新規相談</Button>
        </Link>
      </div>
      <ConsultationList consultations={consultations} />
    </div>
  );
}
