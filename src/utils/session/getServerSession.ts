import { createServerSupabase } from '@/lib/supabase/server';

export const getServerSession = async () => {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
