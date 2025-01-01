'use client';

import { Button } from '@/components/ui/button';
import { createMatch } from '@/features/consultations/action';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';

type Props = {
  consultationId: string;
  createdId: string;
  currentUserId?: string;
};

export default function MatchButton({
  consultationId,
  createdId,
  currentUserId,
}: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  if (currentUserId === createdId) {
    return null;
  }

  const handleMatch = async () => {
    if (!currentUserId) {
      alert('TODO登録画面へ遷移させて登録したらこの詳細に戻ってくる');
      return;
    }

    startTransition(async () => {
      try {
        const res = await createMatch(consultationId);
        if (res) {
          toast({
            title: '成功',
            description: '相談に乗る申請を送りました',
          });
        }
      } catch (error) {
        console.error('マッチング登録エラー:', error);
        toast({
          variant: 'destructive',
          title: 'エラー',
          description: 'マッチング登録に失敗しました',
        });
      }
    });
  };

  return (
    <Button className="mt-4" onClick={handleMatch} disabled={isPending}>
      {isPending ? '送信中...' : '相談に乗る'}
    </Button>
  );
}
