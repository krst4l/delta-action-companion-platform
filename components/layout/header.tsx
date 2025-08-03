'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Search, Bell, User, Gamepad2, Users, Crown, MessageCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { ThemeToggle } from '~/components/themeToggle';
import LocaleSwitcher from '~/components/langSelect/localeSwitcher';
import { usePathname, Link } from '~/lib/i18n/navigation';

import { Badge } from '~/components/ui/badge';

export default function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 监听滚动状态
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.findGamers'), href: '/gamers', icon: Users },
    { name: t('navigation.orders'), href: '/orders', icon: Crown },
    { name: t('navigation.chat'), href: '/chat', icon: MessageCircle },
    { name: t('navigation.profile'), href: '/profile', icon: User },
  ];

  return (
    <>
      <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ease-out ${isScrolled ? 'liquid-glass-header-scrolled' : 'liquid-glass-header'} `}>
        {/* 动态彩虹光线 */}
        <div className="through-purple-500/60 absolute top-0 right-0 left-0 h-px animate-pulse bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        {/* 液态玻璃容器 */}
        <div className="liquid-glass-container">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo区域 - 三角洲陪玩 */}
              <div className="flex items-center space-x-4">
                <Link href="/" className="group flex items-center space-x-3">
                  <div className="relative">
                    <div className="liquid-glow flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-500 group-hover:shadow-blue-500/40">
                      <Gamepad2 className="h-6 w-6 text-white drop-shadow-sm" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-40" />
                  </div>
                  <div className="flex flex-col">
                    <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-lg font-bold text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                      {t('brand.name')}
                    </span>
                    <span className="-mt-1 text-xs text-gray-500 dark:text-gray-400">{t('brand.tagline')}</span>
                  </div>
                </Link>
              </div>

              {/* 桌面导航 - 增强液态效果 */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`liquid-nav-item relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-500 ${
                          isActive
                            ? 'liquid-nav-active text-blue-600 dark:text-blue-400'
                            : 'liquid-nav-hover text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                        } `}>
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.name}
                        {isActive && (
                          <div className="liquid-indicator absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* 右侧操作区 - 增强玻璃按钮 */}
              <div className="flex items-center space-x-2">
                {/* 搜索按钮 */}
                <Button variant="ghost" size="icon" className="liquid-glass-button" asChild>
                  <Link href="/gamers">
                    <Search className="h-4 w-4" />
                  </Link>
                </Button>

                {/* 通知按钮 */}
                <Button variant="ghost" size="icon" className="liquid-glass-button relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-3 w-3 animate-pulse border-2 border-white bg-gradient-to-r from-red-500 to-pink-500 p-0 dark:border-black">
                    <span className="sr-only">3</span>
                  </Badge>
                </Button>

                {/* 语言切换 */}
                <div className="liquid-glass-container-small">
                  <LocaleSwitcher />
                </div>

                {/* 主题切换 */}
                <div className="liquid-glass-container-small">
                  <ThemeToggle />
                </div>

                {/* 登录/注册按钮 */}
                <div className="hidden items-center space-x-2 md:flex">
                  <Button variant="ghost" size="sm" className="liquid-glass-button" asChild>
                    <Link href="/auth/login">{t('actions.login')}</Link>
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" asChild>
                    <Link href="/auth/register">{t('actions.register')}</Link>
                  </Button>
                </div>

                {/* 移动端菜单按钮 */}
                <Button variant="ghost" size="icon" className="liquid-glass-button md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </nav>
        </div>

        {/* 底部彩虹光线 */}
        <div className="through-pink-500/50 absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </header>

      {/* 移动端菜单 - 增强液态效果 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 md:hidden">
          <div className="liquid-glass-mobile-menu">
            <div className="space-y-4 px-4 py-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-500 ${
                      isActive
                        ? 'liquid-nav-active text-blue-600 dark:text-blue-400'
                        : 'liquid-nav-hover text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                    } `}
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {Icon && <Icon className="h-5 w-5" />}
                    {item.name}
                  </Link>
                );
              })}

              {/* 移动端登录/注册 */}
              <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-5 w-5" />
                    {t('actions.login')}
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-medium text-white transition-all duration-500"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {t('actions.register')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 遮罩层 - 增强模糊 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-black/20 backdrop-blur-md transition-all duration-300 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
}
