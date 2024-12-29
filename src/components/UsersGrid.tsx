'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Users, MessageCircle } from 'lucide-react';

export type User = {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  preferredMode: 'online' | 'offline';
  imageUrl?: string;
};

interface UsersGridProps {
  users: User[];
}

export function UsersGrid({ users }: UsersGridProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const getBackgroundColor = (userId: string) => {
    const colors = [
      'bg-gradient-to-br from-pink-400 to-rose-600',
      'bg-gradient-to-br from-purple-400 to-indigo-600',
      'bg-gradient-to-br from-blue-400 to-cyan-600',
      'bg-gradient-to-br from-emerald-400 to-teal-600',
      'bg-gradient-to-br from-amber-400 to-orange-600',
    ];
    const index = parseInt(userId, 16) % colors.length;
    return colors[index];
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Card
          key={user.id}
          className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    user.preferredMode === 'online' ? 'default' : 'secondary'
                  }
                  className={`px-3 py-1 text-xs font-medium ${
                    user.preferredMode === 'online'
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600'
                      : 'bg-gradient-to-r from-orange-300 to-orange-500 hover:from-orange-400 hover:to-orange-600'
                  } `}
                >
                  {user.preferredMode === 'online'
                    ? 'オンライン希望'
                    : 'オフライン希望'}
                </Badge>
                <div className="flex space-x-2">
                  <MessageCircle className="h-5 w-5 text-gray-400 transition-colors group-hover:text-primary" />
                  <Users className="h-5 w-5 text-gray-400 transition-colors group-hover:text-primary" />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20 shadow-lg ring-2 ring-background transition-transform group-hover:scale-105">
                  {user.imageUrl ? (
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.name}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback
                      className={`${getBackgroundColor(user.id)} text-xl font-bold text-white`}
                    >
                      {getInitials(user.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="min-w-0 flex-1 space-y-1">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {user.name}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {user.age}歳
                    </span>
                    <span className="mx-2">•</span>
                    <span>{user.gender}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {user.location}
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {user.bio}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
