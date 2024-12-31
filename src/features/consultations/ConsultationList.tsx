import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, differenceInYears } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Creator = {
  id: string;
  display_name: string;
  birthdate: string;
  gender: string;
  profile_image_url: string | null;
};

type Consultation = {
  id: string;
  title: string;
  description: string;
  consultation_date: string;
  created_at: string;
  creator: Creator;
};

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
        <Card
          key={consultation.id}
          className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-400 to-blue-500"
                >
                  新規相談
                </Badge>
                <div className="flex space-x-2">
                  <MessageSquare className="h-5 w-5 text-gray-400 transition-colors group-hover:text-primary" />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={consultation.creator.profile_image_url || undefined}
                    alt={consultation.creator.display_name}
                  />
                  <AvatarFallback>
                    {getInitials(consultation.creator.display_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {consultation.creator.display_name}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {calculateAge(consultation.creator.birthdate)}歳
                    </span>
                    <span className="mx-2">•</span>
                    <span>{consultation.creator.gender}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {consultation.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(
                    new Date(consultation.consultation_date),
                    'yyyy年MM月dd日',
                    {
                      locale: ja,
                    }
                  )}
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {consultation.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  作成日:{' '}
                  {format(new Date(consultation.created_at), 'yyyy年MM月dd日', {
                    locale: ja,
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
