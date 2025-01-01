import ActionButton from '@/components/ActionButton';
import Link from 'next/link';
import { ConsultationList } from '@/features/consultations/ConsultationList';
import { fetchAllConsultations } from '@/features/consultations/action';
import { PlusCircle } from 'lucide-react';

export default async function ConsultationsPage() {
  const consultations = await fetchAllConsultations();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">相談一覧</h1>
        <Link href="/consultations/new">
          <ActionButton
            label="相談を作成する"
            icon={
              <PlusCircle className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            }
          />
        </Link>
      </div>
      <ConsultationList consultations={consultations} />
    </div>
  );
}
