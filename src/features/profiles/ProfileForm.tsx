'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/DatePicker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { updateProfile } from './action';

const profileFormSchema = z.object({
  display_name: z.string().min(1, '表示名は必須です'),
  gender: z.enum(['male', 'female', 'other']),
  bio: z.string().optional(),
  birthdate: z.date().optional(),
  last_name_kanji: z.string().min(1, '姓（漢字）は必須です'),
  first_name_kanji: z.string().min(1, '名（漢字）は必須です'),
  last_name_kana: z
    .string()
    .min(1, '姓（カナ）は必須です')
    .regex(/^[ァ-ヶー]+$/, 'カタカナで入力してください'),
  first_name_kana: z
    .string()
    .min(1, '名（カナ）は必須です')
    .regex(/^[ァ-ヶー]+$/, 'カタカナで入力してください'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      display_name: '',
      bio: '',
      gender: undefined,
      birthdate: undefined,
      last_name_kanji: '',
      first_name_kanji: '',
      last_name_kana: '',
      first_name_kana: '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile(data);
    } catch (error) {
      console.error('プロフィールの更新に失敗しました:', error);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl shadow-none">
      <CardHeader>
        <h2 className="text-2xl font-semibold tracking-tight">
          プロフィール設定
        </h2>
        <p className="text-sm text-muted-foreground">
          あなたのプロフィール情報を入力してください
        </p>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>表示名（ニックネーム）</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="表示名を入力" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>性別</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">男性</SelectItem>
                      <SelectItem value="female">女性</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>自己紹介</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="自己紹介を入力"
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>生年月日</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="last_name_kanji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>姓（漢字）</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="山田" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="first_name_kanji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名（漢字）</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="太郎" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="last_name_kana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>姓（カナ）</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ヤマダ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="first_name_kana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名（カナ）</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="タロウ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              プロフィールを更新
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
