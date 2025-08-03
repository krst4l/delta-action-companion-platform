import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '~/styles/globals.css';
import { Toaster } from '~/components/ui/sonner';
import { ThemeProvider } from '~/components/provider/themeProvider';
import { Locale, routing } from '~/lib/i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { SWRProvider } from '~/components/provider/swrProvider';
import { RouteTransition } from '~/components/navigation/route-transition';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // ensure font display optimization
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap', // ensure font display optimization
  preload: true,
});

// extract shared configuration as constant
const THEME_COLORS = [
  { media: '(prefers-color-scheme: light)', color: 'white' },
  { media: '(prefers-color-scheme: dark)', color: '#141414' },
];

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://delta-gaming.vadxq.com'),
  title: {
    default: '三角洲游戏陪玩平台 - 专业游戏陪玩服务',
    template: '%s | 三角洲游戏陪玩平台',
  },
  description: '三角洲游戏陪玩平台，提供专业游戏陪玩服务，包括王者荣耀、英雄联盟、和平精英等热门游戏。专业陪玩师，安全可靠，让您的游戏体验更加精彩。',
  keywords: ['游戏陪玩', '王者荣耀陪玩', '英雄联盟陪玩', '和平精英陪玩', '游戏服务', '陪玩平台', '三角洲'],
  authors: [{ name: '三角洲游戏陪玩平台' }],
  creator: '三角洲游戏陪玩平台',
  publisher: '三角洲游戏陪玩平台',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://delta-gaming.vadxq.com',
    title: '三角洲游戏陪玩平台 - 专业游戏陪玩服务',
    description: '三角洲游戏陪玩平台，提供专业游戏陪玩服务，包括王者荣耀、英雄联盟、和平精英等热门游戏。专业陪玩师，安全可靠，让您的游戏体验更加精彩。',
    siteName: '三角洲游戏陪玩平台',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '三角洲游戏陪玩平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '三角洲游戏陪玩平台 - 专业游戏陪玩服务',
    description: '三角洲游戏陪玩平台，提供专业游戏陪玩服务，包括王者荣耀、英雄联盟、和平精英等热门游戏。专业陪玩师，安全可靠，让您的游戏体验更加精彩。',
    images: ['/og-image.png'],
    creator: '@delta_gaming',
  },
  alternates: {
    canonical: 'https://delta-gaming.vadxq.com',
    languages: {
      'zh-CN': 'https://delta-gaming.vadxq.com/zh-CN',
      en: 'https://delta-gaming.vadxq.com/en',
    },
  },
};

// only use generateViewport when you need to dynamically generate based on parameters
// if the configuration is exactly the same, you can consider deleting this function
export function generateViewport() {
  // if you don't need to dynamically generate different configurations based on locale, you can delete this function
  // or add specific locale logic here
  return {
    // use constant to avoid repetition
    themeColor: THEME_COLORS,
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* prevent flashing */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                (function() {
                  var savedTheme = localStorage.getItem('theme')
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                  var theme = savedTheme || 'system'
                  var resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme
                  document.documentElement.classList.add(resolved)
                  document.documentElement.style.colorScheme = resolved
                })()
              } catch(e) { console.error(e) }
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SWRProvider>
              <RouteTransition />
              {children}
              <Toaster />
            </SWRProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
