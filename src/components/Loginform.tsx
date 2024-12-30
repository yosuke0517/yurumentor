'use client';

import { Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { login } from '@/features/auth/action';
import { useToast } from '@/hooks/use-toast';

type FormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'エラー',
          description: error.message,
        });
      }
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">ログイン</h2>
        <p className="text-sm text-muted-foreground">
          メールアドレスとパスワードを入力してください
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                {...register('email', {
                  required: 'メールアドレスは必須です',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '有効なメールアドレスを入力してください',
                  },
                })}
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                {...register('password', {
                  required: 'パスワードは必須です',
                })}
                id="password"
                type="password"
                placeholder="パスワードを入力"
                className="pl-10"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'ログイン中...' : 'ログイン'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
