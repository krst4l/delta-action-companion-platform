'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { RouteLoading } from '~/components/ui/loading';

export function RouteTransition() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      setIsLoading(true);
      setCurrentPath(pathname);

      // 模拟加载时间
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pathname, currentPath]);

  if (!isLoading) return null;

  return <RouteLoading />;
}

// 页面过渡包装器
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <RouteTransition />
      <div className="animate-in fade-in duration-300">{children}</div>
    </div>
  );
}
