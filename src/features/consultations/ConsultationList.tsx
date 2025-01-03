'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, differenceInYears } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Consultation } from './types';

type Props = {
  consultations: Consultation[];
};

export function ConsultationList({ consultations }: Props) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const calculateAge = (birthdate: string) => {
    return differenceInYears(new Date(), new Date(birthdate));
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {consultations.map((consultation) => (
        <Link key={consultation.id} href={`/consultations/${consultation.id}`}>
          <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="consultation">相談に乗って</Badge>
                  <div className="flex space-x-2">
                    <MessageSquare className="h-5 w-5 text-gray-400 transition-colors group-hover:text-primary" />
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 shadow-md ring-2 ring-background">
                    <AvatarImage
                      src={consultation.creator.profile_image_url || undefined}
                      alt={consultation.creator.display_name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-orange-50 to-pink-50 font-medium text-orange-600">
                      {getInitials(consultation.creator.display_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {consultation.creator.display_name}
                      </span>
                      <span className="mx-2 text-pink-300">•</span>
                      <span>
                        {calculateAge(consultation.creator.birthdate)}歳
                      </span>
                      <span className="mx-2 text-pink-300">•</span>
                      <span>{consultation.creator.gender}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {consultation.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4 text-accent" />
                    {format(
                      new Date(consultation.consultation_date),
                      'yyyy年MM月dd日',
                      { locale: ja }
                    )}
                  </div>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {consultation.description}
                  </p>
                  <div className="text-xs text-muted-foreground/70">
                    作成日:{' '}
                    {format(
                      new Date(consultation.created_at),
                      'yyyy年MM月dd日',
                      {
                        locale: ja,
                      }
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="from-consultation-overlay-from/5 via-consultation-overlay-via/5 to-consultation-overlay-to/5 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Card>
        </Link>
      ))}
    </div>
  );
}
