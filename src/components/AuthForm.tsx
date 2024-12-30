import { LoginForm } from './Loginform';
import RegisterForm from './RegisterForm';
import Link from 'next/link';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {mode === 'login' ? 'ログイン' : '新規登録'}
          </h2>
          <Link
            href={mode === 'login' ? '?mode=register' : '?mode=login'}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {mode === 'login' ? '新規登録はこちら' : 'ログインはこちら'}
          </Link>
        </div>

        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
