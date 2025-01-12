import { createServerSupabase } from '@/lib/supabase/server';
import { fetchMatchedUsers } from '../action';
import { MatchedUserCard } from './MatchedUserCard';

export async function MatchedUserList() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const matchedUsers = await fetchMatchedUsers(user.id);
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
        マッチングした人一覧（TODO: 相談毎に表示した方がいいかも）
      </h1>
      {matchedUsers.length === 0 ? (
        <div className="rounded-lg border bg-gradient-to-br from-orange-50/5 to-pink-50/5 p-12">
          <p className="text-center text-muted-foreground">
            まだ相談に乗りたい人はいません。
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {matchedUsers.map((match) => (
            <MatchedUserCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
