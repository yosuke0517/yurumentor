import { AuthForm } from '@/components/AuthForm';

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { mode } = await searchParams;
  const authMode = mode === 'register' ? 'register' : 'login';

  return <AuthForm mode={authMode} />;
}
