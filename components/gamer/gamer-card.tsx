'use client';

import { Gamer } from '~/lib/types';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Star, MapPin, Clock, Users, Zap } from 'lucide-react';
import { cn } from '~/lib/utils';

interface GamerCardProps {
  gamer: Gamer;
  onSelect?: (gamer: Gamer) => void;
  className?: string;
}

export function GamerCard({ gamer, onSelect, className }: GamerCardProps) {
  const { gamerProfile } = gamer;
  const isOnline = gamerProfile.isOnline;
  const lowestPrice = Math.min(...gamerProfile.services.map((s) => s.price));

  return (
    <Card
      className={cn(
        'relative cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
        'border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800',
        'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800',
        className
      )}
      onClick={() => onSelect?.(gamer)}>
      {/* 在线状态指示器 */}
      {isOnline && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
            在线
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
              <AvatarImage src={gamer.avatar} alt={gamer.username} />
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 font-bold text-white">{gamer.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {isOnline && <div className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 border-white bg-green-500" />}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">{gamer.username}</h3>
              {gamer.isVerified && (
                <Badge variant="secondary" className="border-blue-200 bg-blue-100 text-blue-700">
                  <Zap className="mr-1 h-3 w-3" />
                  认证
                </Badge>
              )}
            </div>

            <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">{gamerProfile.title}</p>

            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{gamerProfile.rating}</span>
                <span>({gamerProfile.reviewCount})</span>
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{gamerProfile.totalOrders}单</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{gamerProfile.responseTime}s响应</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        {/* 技能标签 */}
        <div className="mb-3 flex flex-wrap gap-1">
          {gamerProfile.skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill.id}
              variant="outline"
              className={cn(
                'text-xs',
                skill.verified
                  ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
              )}>
              {skill.name}
              {skill.verified && <Zap className="ml-1 h-2 w-2" />}
            </Badge>
          ))}
          {gamerProfile.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{gamerProfile.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* 描述 */}
        <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{gamerProfile.description}</p>

        {/* 位置信息 */}
        {gamer.location && (
          <div className="mb-3 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
            <MapPin className="h-3 w-3" />
            <span>{gamer.location}</span>
          </div>
        )}

        {/* 服务价格 */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <div className="text-lg font-bold text-red-500">
              ¥{lowestPrice}
              <span className="text-sm font-normal text-gray-500">/小时起</span>
            </div>
            <div className="text-xs text-gray-500">{gamerProfile.services.length}种服务可选</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 pb-4">
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: 打开聊天窗口
            }}>
            咨询
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(gamer);
            }}>
            立即预约
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
