import { Header } from '@/components/Header';
import { createServerSupabase } from '@/lib/supabase/server';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <main className="container py-10">
      <Header user={user} />
      {children}
    </main>
  );
}
