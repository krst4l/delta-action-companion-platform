'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Gamer, SearchFilters } from '~/lib/types';
import { GamerCard } from '~/components/gamer/gamer-card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Badge } from '~/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '~/lib/utils';

export default function GamersPage() {
  const t = useTranslations();
  const [gamers, setGamers] = useState<Gamer[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'rating',
    sortOrder: 'desc',
  });
  const [showFilters, setShowFilters] = useState(false);

  // 获取陪玩师列表
  const fetchGamers = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      if (filters.keywords) queryParams.set('keywords', filters.keywords);
      if (filters.skills?.length) queryParams.set('skills', filters.skills.join(','));
      if (filters.priceRange) {
        queryParams.set('minPrice', filters.priceRange.min.toString());
        queryParams.set('maxPrice', filters.priceRange.max.toString());
      }
      if (filters.rating) queryParams.set('rating', filters.rating.toString());
      if (filters.gender) queryParams.set('gender', filters.gender);
      if (filters.isOnline !== undefined) queryParams.set('isOnline', filters.isOnline.toString());
      if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);
      if (filters.sortOrder) queryParams.set('sortOrder', filters.sortOrder);

      const response = await fetch(`/api/gamers?${queryParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        setGamers(data.data.gamers);
      }
    } catch (error) {
      console.error('获取陪玩师列表失败:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchGamers();
  }, [fetchGamers]);

  const handleSearch = (keywords: string) => {
    setFilters({ ...filters, keywords });
  };

  const handleSelectGamer = (gamer: Gamer) => {
    // TODO: 跳转到陪玩师详情页或打开预约弹窗
    console.log('选择陪玩师:', gamer);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 页面头部 */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">🎮 三角洲陪玩师</h1>
            <p className="text-gray-600 dark:text-gray-400">专业陪玩师为您提供优质游戏体验</p>
          </div>

          {/* 搜索栏 */}
          <div className="mx-auto flex max-w-4xl gap-4">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input placeholder="搜索陪玩师、技能或服务..." className="h-12 pl-10 text-lg" value={filters.keywords || ''} onChange={(e) => handleSearch(e.target.value)} />
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'h-12 px-6 transition-all duration-200',
                showFilters && 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-300'
              )}>
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              筛选
            </Button>
          </div>

          {/* 筛选面板 */}
          {showFilters && (
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {/* 排序方式 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">排序方式</label>
                  <Select value={filters.sortBy} onValueChange={(value: 'price' | 'rating' | 'experience' | 'response_time') => setFilters({ ...filters, sortBy: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">评分最高</SelectItem>
                      <SelectItem value="price">价格最低</SelectItem>
                      <SelectItem value="experience">经验最多</SelectItem>
                      <SelectItem value="response_time">响应最快</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 性别筛选 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">性别</label>
                  <Select
                    value={filters.gender || 'all'}
                    onValueChange={(value) =>
                      setFilters({
                        ...filters,
                        gender: value === 'all' ? undefined : (value as 'male' | 'female'),
                      })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">不限</SelectItem>
                      <SelectItem value="male">男性</SelectItem>
                      <SelectItem value="female">女性</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 在线状态 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">在线状态</label>
                  <Select
                    value={filters.isOnline === undefined ? 'all' : filters.isOnline.toString()}
                    onValueChange={(value) =>
                      setFilters({
                        ...filters,
                        isOnline: value === 'all' ? undefined : value === 'true',
                      })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">不限</SelectItem>
                      <SelectItem value="true">仅在线</SelectItem>
                      <SelectItem value="false">仅离线</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 最低评分 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">最低评分</label>
                  <Select
                    value={filters.rating?.toString() || 'all'}
                    onValueChange={(value) =>
                      setFilters({
                        ...filters,
                        rating: value === 'all' ? undefined : Number(value),
                      })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">不限</SelectItem>
                      <SelectItem value="4.5">4.5星以上</SelectItem>
                      <SelectItem value="4.0">4.0星以上</SelectItem>
                      <SelectItem value="3.5">3.5星以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 陪玩师列表 */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 统计信息 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-gray-600 dark:text-gray-400">
            找到 <span className="font-semibold text-gray-900 dark:text-white">{gamers.length}</span> 位专业陪玩师
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">
              <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
              {gamers.filter((g) => g.gamerProfile.isOnline).length} 位在线
            </Badge>
          </div>
        </div>

        {/* 陪玩师卡片网格 */}
        {loading ? (
          <div className="py-12 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
          </div>
        ) : gamers.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">😅</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">暂无符合条件的陪玩师</h3>
            <p className="text-gray-600 dark:text-gray-400">试试调整筛选条件或搜索关键词</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gamers.map((gamer) => (
              <GamerCard key={gamer.id} gamer={gamer} onSelect={handleSelectGamer} className="transition-all duration-300 hover:shadow-xl" />
            ))}
          </div>
        )}

        {/* 加载更多按钮 */}
        {gamers.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                // TODO: 实现分页加载
              }}>
              加载更多陪玩师
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
