import { ConsultationForm } from '@/features/consultations/ConsultationForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewConsultationPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link href="/consultations">
          <Button variant="ghost" className="pl-0">
            <ChevronLeft className="mr-2 h-4 w-4" />
            相談一覧に戻る
          </Button>
        </Link>
      </div>
      <ConsultationForm />
    </div>
  );
}
