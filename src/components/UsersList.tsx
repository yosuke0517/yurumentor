import { type User } from './UsersGrid';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

async function getUsers() {
  const supabase = await createServerSupabase();
  const { data: users, error } = await supabase.from('profiles').select('*');
  if (error) throw error;
  return users;
}

export default async function UsersList() {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const users: User[] = await getUsers();
  return <div>UsersList{JSON.stringify(users)}</div>;
}
