'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '~/lib/i18n/navigation';
import { Gamer } from '~/lib/types';
import { GamerCard } from '~/components/gamer/gamer-card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import PageLayout from '~/components/layout/pageLayout';
import { Search, Users, Star, Clock, Shield, Gamepad2, Zap, Crown, Target, ChevronRight, Play } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('homePage');
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
                  {t('badge')}
                </Badge>
              </div>

              <h1 className="mb-6 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-5xl font-bold text-transparent md:text-7xl">🎮 {t('hero.title')}</h1>
              <h2 className="mb-4 text-2xl font-bold md:text-4xl">{t('hero.subtitle')}</h2>
              <p className="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">{t('hero.description')}</p>

              {/* 搜索栏 */}
              <div className="mx-auto mb-8 max-w-2xl">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      placeholder={t('search.placeholder')}
                      className="h-14 border-white/20 bg-white/10 pl-12 text-lg text-white backdrop-blur-sm placeholder:text-blue-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button size="lg" className="h-14 bg-yellow-500 px-8 font-bold text-black hover:bg-yellow-600" onClick={handleSearch}>
                    {t('search.button')}
                  </Button>
                </div>
              </div>

              {/* 快速导航 */}
              <div className="mb-12 flex flex-wrap justify-center gap-4">
                <Link href="/gamers?isOnline=true">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Zap className="mr-2 h-5 w-5" />
                    {t('quickNav.online')}
                  </Button>
                </Link>
                <Link href="/gamers?sortBy=rating">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Star className="mr-2 h-5 w-5" />
                    {t('quickNav.rated')}
                  </Button>
                </Link>
                <Link href="/gamers?gender=female">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Users className="mr-2 h-5 w-5" />
                    {t('quickNav.female')}
                  </Button>
                </Link>
              </div>

              {/* 统计数据 */}
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">{t('stats.gamers')}</div>
                  <div className="text-blue-200">{t('stats.gamersLabel')}</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">{t('stats.orders')}</div>
                  <div className="text-blue-200">{t('stats.ordersLabel')}</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">{t('stats.rating')}</div>
                  <div className="text-blue-200">{t('stats.ratingLabel')}</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">{t('stats.satisfaction')}</div>
                  <div className="text-blue-200">{t('stats.satisfactionLabel')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 特色服务 */}
        <section className="bg-white py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">{t('features.title')}</h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">{t('features.description')}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center dark:from-blue-900 dark:to-blue-800">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{t('features.certification.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('features.certification.description')}</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center dark:from-purple-900 dark:to-purple-800">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{t('features.skills.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('features.skills.description')}</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center dark:from-green-900 dark:to-green-800">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{t('features.response.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('features.response.description')}</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 text-center dark:from-yellow-900 dark:to-yellow-800">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{t('features.guarantee.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('features.guarantee.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 推荐陪玩师 */}
        <section className="bg-gray-50 py-16 dark:bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">{t('featured.title')}</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">{t('featured.description')}</p>
              </div>
              <Link href="/gamers">
                <Button variant="outline" size="lg" className="hidden md:flex">
                  {t('featured.viewAll')}
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
                <p className="text-gray-600 dark:text-gray-400">{t('featured.loading')}</p>
              </div>
            )}

            <div className="text-center">
              <Link href="/gamers">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  {t('featured.browseAll')}
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
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">{t('gameFeatures.title')}</h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">{t('gameFeatures.description')}</p>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500">
                    <Gamepad2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{t('gameFeatures.tactics.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('gameFeatures.tactics.description')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{t('gameFeatures.teamwork.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('gameFeatures.teamwork.description')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-500">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{t('gameFeatures.ranking.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('gameFeatures.ranking.description')}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <div className="text-center">
                    <Play className="mx-auto mb-4 h-20 w-20 opacity-80" />
                    <p className="text-xl font-semibold">{t('gameFeatures.demo.title')}</p>
                    <p className="mt-2 text-blue-200">{t('gameFeatures.demo.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t('cta.title')}</h2>
            <p className="mb-8 text-xl text-blue-100">{t('cta.description')}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/gamers">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  {t('cta.findGamers')}
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  {t('cta.register')}
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
