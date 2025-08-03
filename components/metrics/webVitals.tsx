// components/metrics/WebVitals.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function WebVitalsReporter() {
  const pathname = usePathname();

  useReportWebVitals((metric) => {
    const body = JSON.stringify({
      ...metric,
      pathname,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      // 添加更多性能指标
      memory: 'memory' in performance ? (performance as { memory: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory : null,
      navigation: performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming,
      resources: performance.getEntriesByType('resource'),
    });

    // send performance data to analysis endpoint
    if (window.navigator.sendBeacon) {
      window.navigator.sendBeacon('/api/metrics', body);
    } else {
      fetch('/api/metrics', {
        body,
        method: 'POST',
        keepalive: true,
      });
    }
  });

  // 监控页面加载性能
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', (entry as { value: number }).value);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    return () => observer.disconnect();
  }, []);

  // 监控资源加载性能
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.initiatorType === 'img' && resourceEntry.duration > 1000) {
            console.warn('Slow image load:', resourceEntry.name, resourceEntry.duration);
          }
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return null;
}

// 性能监控Hook
export function usePerformanceMonitoring() {
  useEffect(() => {
    // 监控页面可见性变化
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('Page hidden');
      } else {
        console.log('Page visible');
      }
    };

    // 监控网络状态
    const handleOnline = () => console.log('Network online');
    const handleOffline = () => console.log('Network offline');

    // 监控内存使用
    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as { memory: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          console.warn('High memory usage:', memory.usedJSHeapSize);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 定期检查内存使用
    const memoryInterval = setInterval(checkMemory, 30000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(memoryInterval);
    };
  }, []);
}
