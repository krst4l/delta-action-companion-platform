'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function SEO({ title, description, keywords = [], image, type = 'website', publishedTime, modifiedTime, author, section, tags = [] }: SEOProps) {
  const pathname = usePathname();

  useEffect(() => {
    // 动态更新页面标题
    if (title) {
      document.title = title;
    }

    // 更新meta标签
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 更新描述
    if (description) {
      updateMetaTag('description', description);
      updatePropertyTag('og:description', description);
      updatePropertyTag('twitter:description', description);
    }

    // 更新关键词
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    // 更新Open Graph标签
    if (title) {
      updatePropertyTag('og:title', title);
      updatePropertyTag('twitter:title', title);
    }

    if (image) {
      updatePropertyTag('og:image', image);
      updatePropertyTag('twitter:image', image);
    }

    updatePropertyTag('og:type', type);
    updatePropertyTag('og:url', window.location.href);

    // 更新结构化数据
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebPage',
      headline: title,
      description,
      image,
      url: window.location.href,
      ...(publishedTime && { datePublished: publishedTime }),
      ...(modifiedTime && { dateModified: modifiedTime }),
      ...(author && { author: { '@type': 'Person', name: author } }),
      ...(section && { articleSection: section }),
      ...(tags.length > 0 && { keywords: tags.join(', ') }),
    };

    // 移除旧的结构化数据
    const oldScript = document.querySelector('script[data-seo-structured]');
    if (oldScript) {
      oldScript.remove();
    }

    // 添加新的结构化数据
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo-structured', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [title, description, keywords, image, type, publishedTime, modifiedTime, author, section, tags, pathname]);

  return null;
}

// 结构化数据组件
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [data]);

  return null;
}

// 面包屑导航组件
export function Breadcrumb({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <nav aria-label="面包屑导航" className="text-muted-foreground text-sm">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              <a href={item.url} className="hover:text-foreground transition-colors" {...(index === items.length - 1 && { 'aria-current': 'page' })}>
                {item.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
