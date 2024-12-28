'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    age: number;
    gender: string;
    location: string;
    bio: string;
    imageUrl: string;
  };
  onLike: (userId: string) => void;
}

export function UserCard({ user, onLike }: UserCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{user.name}, {user.age}</h3>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{user.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{user.bio}</p>
      </CardContent>
      <CardFooter className="overflow-hidden">
        <div className="flex flex-row w-full gap-2">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onLike(user.id)}
            className="hover:text-rose-500 hover:border-rose-500 flex-1 min-w-0"
          >
            <Heart className="h-4 w-4 mr-2" />
            お気に入り
          </Button>
          <Button variant="default" size="lg" className="flex-1 min-w-0">
            プロフィール
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 