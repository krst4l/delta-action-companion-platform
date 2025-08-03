'use client';

import { useState, useEffect } from 'react';

import { Link } from '~/lib/i18n/navigation';
import { Gamer } from '~/lib/types';
import { GamerCard } from '~/components/gamer/gamer-card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import PageLayout from '~/components/layout/pageLayout';
import { Search, Users, Star, Clock, Shield, Gamepad2, Zap, Crown, Target, ChevronRight, Play } from 'lucide-react';

export default function HomePage() {
  const [featuredGamers, setFeaturedGamers] = useState<Gamer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 获取推荐陪玩师
  useEffect(() => {
    const fetchFeaturedGamers = async () => {
      try {
        const response = await fetch('/api/gamers?page=1&pageSize=4&sortBy=rating&sortOrder=desc');
        const data = await response.json();
        if (data.success) {
          setFeaturedGamers(data.data.gamers);
        }
      } catch (error) {
        console.error('获取推荐陪玩师失败:', error);
      }
    };

    fetchFeaturedGamers();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/gamers?keywords=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-6">
                <Badge className="mb-4 inline-flex items-center bg-yellow-500 px-4 py-2 text-lg font-bold text-yellow-900">
                  <Crown className="mr-2 h-5 w-5" />
                  官方正版授权
                </Badge>
              </div>

              <h1 className="mb-6 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-5xl font-bold text-transparent md:text-7xl">🎮 三角洲行动</h1>
              <h2 className="mb-4 text-2xl font-bold md:text-4xl">专业陪玩平台</h2>
              <p className="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">
                汇聚顶级三角洲玩家，提供专业陪玩服务
                <br />
                让每一局游戏都成为精彩体验
              </p>

              {/* 搜索栏 */}
              <div className="mx-auto mb-8 max-w-2xl">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      placeholder="搜索专业陪玩师..."
                      className="h-14 border-white/20 bg-white/10 pl-12 text-lg text-white backdrop-blur-sm placeholder:text-blue-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button size="lg" className="h-14 bg-yellow-500 px-8 font-bold text-black hover:bg-yellow-600" onClick={handleSearch}>
                    立即搜索
                  </Button>
                </div>
              </div>

              {/* 快速导航 */}
              <div className="mb-12 flex flex-wrap justify-center gap-4">
                <Link href="/gamers?isOnline=true">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Zap className="mr-2 h-5 w-5" />
                    在线陪玩师
                  </Button>
                </Link>
                <Link href="/gamers?sortBy=rating">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Star className="mr-2 h-5 w-5" />
                    高分陪玩师
                  </Button>
                </Link>
                <Link href="/gamers?gender=female">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Users className="mr-2 h-5 w-5" />
                    女性陪玩师
                  </Button>
                </Link>
              </div>

              {/* 统计数据 */}
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">1000+</div>
                  <div className="text-blue-200">专业陪玩师</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">50000+</div>
                  <div className="text-blue-200">服务订单</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">4.9★</div>
                  <div className="text-blue-200">平均评分</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">98%</div>
                  <div className="text-blue-200">满意度</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 特色服务 */}
        <section className="bg-white py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">为什么选择我们</h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">专业的陪玩团队，贴心的服务体验，让您在三角洲战场上无往不利</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center dark:from-blue-900 dark:to-blue-800">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">专业认证</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  严格筛选，实名认证
                  <br />
                  确保每位陪玩师专业可靠
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center dark:from-purple-900 dark:to-purple-800">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">技能精湛</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  专精各种战术技巧
                  <br />
                  助您快速提升游戏水平
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center dark:from-green-900 dark:to-green-800">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">快速响应</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  24小时在线服务
                  <br />
                  随时随地满足您的需求
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 text-center dark:from-yellow-900 dark:to-yellow-800">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">服务保障</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  不满意全额退款
                  <br />
                  让您无忧享受游戏乐趣
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 推荐陪玩师 */}
        <section className="bg-gray-50 py-16 dark:bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">明星陪玩师</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">平台顶级陪玩师，为您带来极致游戏体验</p>
              </div>
              <Link href="/gamers">
                <Button variant="outline" size="lg" className="hidden md:flex">
                  查看全部
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {featuredGamers.length > 0 ? (
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {featuredGamers.map((gamer) => (
                  <GamerCard key={gamer.id} gamer={gamer} onSelect={(g) => console.log('选择陪玩师:', g)} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                <p className="text-gray-600 dark:text-gray-400">加载推荐陪玩师...</p>
              </div>
            )}

            <div className="text-center">
              <Link href="/gamers">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  浏览所有陪玩师
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 游戏特色 */}
        <section className="bg-white py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">三角洲行动 · 专业服务</h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">专注三角洲行动游戏的陪玩平台，提供最专业的游戏指导和陪伴服务</p>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500">
                    <Gamepad2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">战术指导</h3>
                    <p className="text-gray-600 dark:text-gray-400">专业教练一对一指导，传授高级战术和技巧，快速提升您的游戏水平</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">团队配合</h3>
                    <p className="text-gray-600 dark:text-gray-400">组建专业小队，学习团队协作，体验真正的战术配合乐趣</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-500">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">排位上分</h3>
                    <p className="text-gray-600 dark:text-gray-400">专业代练服务，快速上分，让您轻松达到理想段位</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <div className="text-center">
                    <Play className="mx-auto mb-4 h-20 w-20 opacity-80" />
                    <p className="text-xl font-semibold">游戏演示视频</p>
                    <p className="mt-2 text-blue-200">点击观看精彩操作</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">准备开始你的三角洲之旅了吗？</h2>
            <p className="mb-8 text-xl text-blue-100">立即加入我们，与专业陪玩师一起征战三角洲战场</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/gamers">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  找陪玩师
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  立即注册
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
