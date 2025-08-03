'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Twitter, Mail, Send, Gamepad2, ArrowUp, Heart, Users, Shield } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function Footer() {
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: '游戏服务',
      links: [
        { name: '三角洲行动陪玩', href: '/gamers?game=delta' },
        { name: '王者荣耀陪玩', href: '/gamers?game=honor' },
        { name: '英雄联盟陪玩', href: '/gamers?game=lol' },
        { name: '和平精英陪玩', href: '/gamers?game=peace' },
      ],
    },
    {
      title: '陪玩师',
      links: [
        { name: '在线陪玩师', href: '/gamers?isOnline=true' },
        { name: '高分陪玩师', href: '/gamers?sortBy=rating' },
        { name: '女性陪玩师', href: '/gamers?gender=female' },
        { name: '认证陪玩师', href: '/gamers?verified=true' },
      ],
    },
    {
      title: '服务保障',
      links: [
        { name: '安全保障', href: '/safety' },
        { name: '服务条款', href: '/terms' },
        { name: '隐私政策', href: '/privacy' },
        { name: '退款政策', href: '/refund' },
      ],
    },
    {
      title: '联系我们',
      links: [
        { name: '客服中心', href: '/support' },
        { name: '意见反馈', href: '/feedback' },
        { name: '商务合作', href: '/business' },
        { name: '加入我们', href: '/careers' },
      ],
    },
  ];

  const socialLinks = [
    { name: '微信', icon: Mail, href: '#', color: 'hover:text-green-500' },
    { name: 'QQ', icon: Mail, href: '#', color: 'hover:text-blue-500' },
    { name: '微博', icon: Twitter, href: '#', color: 'hover:text-red-500' },
    { name: '抖音', icon: Users, href: '#', color: 'hover:text-pink-500' },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 dark:border-white/5">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/10" />
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative bg-white/60 backdrop-blur-sm dark:bg-black/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 主要内容区域 */}
          <div className="py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* 品牌和订阅区域 */}
              <div className="space-y-8 lg:col-span-5">
                {/* 品牌区域 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <Gamepad2 className="h-5 w-5 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-30 blur-lg" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-gray-300">
                      三角洲游戏陪玩平台
                    </span>
                  </div>
                </div>

                {/* 订阅区域 */}
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">保持更新</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">获取最新陪玩师信息和平台活动通知</p>
                  </div>

                  <form onSubmit={handleSubscribe} className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        type="email"
                        placeholder="输入您的邮箱"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-white/20 bg-white/50 backdrop-blur-sm transition-all duration-300 focus:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:focus:bg-white/10"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="border-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-blue-500/25"
                      disabled={isSubscribed}>
                      {isSubscribed ? <Heart className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>

                  {isSubscribed && <p className="animate-pulse text-sm text-green-600 dark:text-green-400">✨ 订阅成功！感谢您的关注</p>}
                </div>
              </div>

              {/* 链接区域 */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  {footerSections.map((section) => (
                    <div key={section.title} className="space-y-4">
                      <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">{section.title}</h3>
                      <ul className="space-y-3">
                        {section.links.map((link) => (
                          <li key={link.name}>
                            <Link href={link.href} className="text-sm text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="h-px border-t border-white/10 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent dark:border-white/5" />

          {/* 底部区域 */}
          <div className="py-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              {/* 版权信息 */}
              <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 md:flex-row md:space-y-0 md:space-x-6 dark:text-gray-400">
                <p>© 2024 三角洲游戏陪玩平台. 保留所有权利.</p>
                <div className="hidden h-1 w-1 rounded-full bg-gray-400 md:block" />
                <p className="flex items-center space-x-1">
                  <span>专业陪玩服务</span>
                  <Shield className="h-3 w-3 text-blue-500" />
                </p>
              </div>

              {/* 社交链接和回到顶部 */}
              <div className="flex items-center space-x-4">
                {/* 社交媒体 */}
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`rounded-lg border border-white/20 bg-white/50 p-2 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 ${social.color} backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                      target="_blank"
                      rel="noopener noreferrer">
                      <social.icon className="h-4 w-4" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  ))}
                </div>

                {/* 回到顶部按钮 */}
                <Button
                  onClick={scrollToTop}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <ArrowUp className="h-4 w-4" />
                  <span className="sr-only">回到顶部</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部装饰光线 */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </footer>
  );
}
