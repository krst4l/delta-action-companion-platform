'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Locale } from '~/lib/i18n/routing';
import { usePathname, useRouter } from '~/lib/i18n/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  }

  const getCurrentLanguageName = () => {
    const name = locale === 'zh-CN' ? '简体中文' : 'English';
    return name;
  };

  const getCurrentLanguageFlag = () => {
    const flag = locale === 'zh-CN' ? '🇨🇳' : '🇺🇸';
    return flag;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="liquid-glass-button flex items-center gap-2" disabled={isPending}>
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{getCurrentLanguageFlag()}</span>
          <span className="hidden md:inline">{getCurrentLanguageName()}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="liquid-glass-dropdown">
        <DropdownMenuItem
          onClick={() => onSelectChange('zh-CN')}
          className={`flex items-center gap-2 ${locale === 'zh-CN' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : ''}`}>
          <span>🇨🇳</span>
          <span>简体中文</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onSelectChange('en')}
          className={`flex items-center gap-2 ${locale === 'en' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : ''}`}>
          <span>🇺🇸</span>
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
