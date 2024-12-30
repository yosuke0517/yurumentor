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
import { login } from '@/features/auth/action';

export function LoginForm() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">ログイン</h2>
        <p className="text-sm text-muted-foreground">
          メールアドレスとパスワードを入力してください
        </p>
      </CardHeader>
      <form action={login}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="パスワードを入力"
                className="pl-10"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">ログイン</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
