'use client';

import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
// import { ja } from 'date-fns/locale';

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  name?: string;
};

export function DatePicker({ value, onChange, name }: DatePickerProps) {
  return (
    <div className="grid w-full gap-2">
      <Input
        type="date"
        id={name}
        name={name}
        placeholder="生年月日を選択"
        value={value ? format(value, 'yyyy-MM-dd') : ''}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value ? new Date(e.target.value) : undefined);
          }
        }}
      />
      {/* 一旦コメントアウト UX悪そうだったら復活 */}
      {/* 
      <Calendar
        mode="single"
        selected={value}
        onSelect={onChange}
        locale={ja}
        className="rounded-md border"
      />
      */}
    </div>
  );
}
