import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <Link href="/consultations">
      <Button variant="ghost" className="pl-0">
        <ChevronLeft className="mr-2 h-4 w-4" />
        相談一覧に戻る
      </Button>
    </Link>
  );
};

export default BackButton;
