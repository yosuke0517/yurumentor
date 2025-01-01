import { createBrowserSupabase } from '@/lib/supabase/client';

export const getClientSession = async () => {
  const supabase = await createBrowserSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
