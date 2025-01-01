import { ConsultationForm } from '@/features/consultations/ConsultationForm';
import BackButton from '@/features/consultations/components/BackButton';

export default function NewConsultationPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <BackButton />
      </div>
      <ConsultationForm />
    </div>
  );
}
