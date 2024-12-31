'use client';

import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/DatePicker';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ConsultationFormData, createConsultation } from './action';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Form } from '@/components/ui/form';

export function ConsultationForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ConsultationFormData>({
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ConsultationFormData) => {
    try {
      await createConsultation(data);
      toast({
        title: '成功',
        description: '相談を作成しました',
      });
      router.refresh();
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
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">新規相談</h2>
        <p className="text-sm text-muted-foreground">
          相談内容を入力してください
        </p>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                {...register('title', {
                  required: 'タイトルは必須です',
                })}
                id="title"
                placeholder="相談のタイトル"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">相談内容</Label>
              <Textarea
                {...register('description', {
                  required: '相談内容は必須です',
                })}
                id="content"
                placeholder="相談内容を詳しく記入してください"
                rows={5}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="consultationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>相談希望日</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? '送信中...' : '相談を作成'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
