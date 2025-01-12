import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-white via-orange-50/30 to-pink-50/30">
      <div className="bg-grid-orange/[0.03] pointer-events-none absolute inset-0 bg-[size:20px_20px]" />
      <div className="relative text-center">
        <h1 className="bg-gradient-to-r from-orange-400 via-pink-500 to-rose-400 bg-clip-text text-8xl font-bold text-transparent">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          ページが見つかりません
        </h2>
        <p className="mt-2 text-gray-500">
          お探しのページは削除されたか、URLが間違っている可能性があります。
        </p>
        <Button asChild className="mt-8">
          <Link href="/consultations" className="inline-flex items-center">
            <span>トップページへ戻る</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
