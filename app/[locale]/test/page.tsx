'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function TestPage() {
  const t = useTranslations('homePage');
  const locale = useLocale();

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">翻译测试页面</h1>

      <div className="space-y-4">
        <div>
          <strong>当前语言:</strong> {locale}
        </div>

        <div>
          <strong>Badge:</strong> {t('badge')}
        </div>

        <div>
          <strong>Hero Title:</strong> {t('hero.title')}
        </div>

        <div>
          <strong>Hero Subtitle:</strong> {t('hero.subtitle')}
        </div>

        <div>
          <strong>Search Placeholder:</strong> {t('search.placeholder')}
        </div>

        <div>
          <strong>Search Button:</strong> {t('search.button')}
        </div>

        <div>
          <strong>Quick Nav Online:</strong> {t('quickNav.online')}
        </div>

        <div>
          <strong>Quick Nav Rated:</strong> {t('quickNav.rated')}
        </div>

        <div>
          <strong>Quick Nav Female:</strong> {t('quickNav.female')}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">调试信息</h2>
        <pre className="rounded bg-gray-100 p-4">
          {JSON.stringify(
            {
              locale,
              translations: {
                badge: t('badge'),
                heroTitle: t('hero.title'),
                heroSubtitle: t('hero.subtitle'),
                searchPlaceholder: t('search.placeholder'),
                searchButton: t('search.button'),
                quickNavOnline: t('quickNav.online'),
                quickNavRated: t('quickNav.rated'),
                quickNavFemale: t('quickNav.female'),
              },
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
