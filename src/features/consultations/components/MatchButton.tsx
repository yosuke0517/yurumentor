'use client';

import { createMatch } from '@/features/consultations/action';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition } from 'react';
import ActionButton from '@/components/ActionButton';
import { PlusCircle } from 'lucide-react';

type Props = {
  consultationId: string;
  createdId: string;
  currentUserId?: string;
  isSent: boolean;
};

export default function MatchButton({
  consultationId,
  createdId,
  currentUserId,
  isSent: initialIsSent,
}: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isSent, setIsSent] = useState(initialIsSent);

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
          setIsSent(true);
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
    <ActionButton
      onClick={handleMatch}
      label={isPending ? '送信中...' : isSent ? '申請済み' : '相談に乗る'}
      icon={isSent ? null : <PlusCircle className="h-5 w-5" />}
      disabled={isPending || isSent}
    />
  );
}
