'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '~/lib/utils';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Loading({ className, size = 'md', text }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-4', className)}>
      <Loader2 className={cn('text-primary animate-spin', sizeClasses[size])} />
      {text && <p className="text-muted-foreground mt-2 animate-pulse text-sm">{text}</p>}
    </div>
  );
}

// 全局页面加载组件
export function PageLoading() {
  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="border-primary/20 border-t-primary h-12 w-12 animate-spin rounded-full border-4" />
        </div>
        <p className="text-muted-foreground animate-pulse text-sm">正在加载...</p>
      </div>
    </div>
  );
}

// 路由加载组件
export function RouteLoading() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50">
      <div className="from-primary via-primary/80 to-primary/60 h-1 animate-pulse bg-gradient-to-r" />
    </div>
  );
}
