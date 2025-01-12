'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import { MatchedUser } from '../config';
import Link from 'next/link';
import ActionButton from '@/components/ActionButton';

type MatchedUserCardProps = {
  match: MatchedUser;
};

export function MatchedUserCard({ match }: MatchedUserCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const handleApprove = async () => {
    // TODO: マッチング承認の処理を実装
    console.log('承認処理:', match.id);
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <Badge
              variant="consultation"
              className="bg-gradient-to-r from-pink-500/80 to-orange-500/80 text-white"
            >
              {match.status}
            </Badge>
            <div className="flex space-x-2">
              <MessageSquare className="h-5 w-5 text-gray-400 transition-colors group-hover:text-primary" />
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12 shadow-md ring-2 ring-background">
              <AvatarImage
                src={match.profiles.profile_image_url}
                alt={match.profiles.display_name}
              />
              <AvatarFallback className="bg-gradient-to-br from-orange-50 to-pink-50 font-medium text-orange-600">
                {getInitials(match.profiles.display_name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h2 className="font-medium text-foreground">
                {match.profiles.display_name}
              </h2>
              <Link
                href={`/consultations/${match.consultations.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {match.consultations.title}
                </p>
              </Link>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <ActionButton
              onClick={handleApprove}
              label="この人に依頼する"
              disabled={match.status !== 'pending'}
              buttonType="secondary"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
