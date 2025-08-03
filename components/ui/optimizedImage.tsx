'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '~/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallback?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  loading = 'lazy',
  onLoad,
  onError,
  fallback = '/images/placeholder.png',
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    if (!hasError && imageSrc !== fallback) {
      setImageSrc(fallback);
      setHasError(true);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
    onError?.();
  };

  // 预加载关键图片
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && <div className="bg-muted absolute inset-0 animate-pulse" />}

      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn('transition-opacity duration-300', isLoading ? 'opacity-0' : 'opacity-100')}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        fill={fill}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
        }}
      />

      {hasError && (
        <div className="bg-muted text-muted-foreground absolute inset-0 flex items-center justify-center">
          <span className="text-sm">图片加载失败</span>
        </div>
      )}
    </div>
  );
}

// 响应式图片组件
export function ResponsiveImage({ src, alt, className, aspectRatio = '16/9', ...props }: OptimizedImageProps & { aspectRatio?: string }) {
  return (
    <div className={cn('relative', className)} style={{ aspectRatio }}>
      <OptimizedImage src={src} alt={alt} fill className="object-cover" {...props} />
    </div>
  );
}

// 懒加载图片组件
export function LazyImage({ src, alt, className, threshold = 0.1, ...props }: OptimizedImageProps & { threshold?: number }) {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return (
    <div ref={setRef} className={className}>
      {isInView ? <OptimizedImage src={src} alt={alt} {...props} /> : <div className="bg-muted animate-pulse" style={{ aspectRatio: '16/9' }} />}
    </div>
  );
}
