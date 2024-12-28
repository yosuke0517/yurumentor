import { Suspense } from 'react';
import UsersList from '@/components/UsersList';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function UserCardSkeleton() {
  return (
    <Card className="mx-auto h-[314px] w-full max-w-md">
      <CardContent className="h-24 pt-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="overflow-hidden">
        <div className="flex w-full flex-row gap-2">
          <Skeleton className="h-14 flex-1" />
          <Skeleton className="h-14 flex-1" />
        </div>
      </CardFooter>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <UserCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function UsersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">おすすめのユーザー</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <UsersList />
      </Suspense>
    </main>
  );
}
