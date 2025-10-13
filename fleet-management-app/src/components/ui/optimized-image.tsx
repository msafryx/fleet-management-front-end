/**
 * Optimized Image Component
 * Performance optimization: Wrapper around Next.js Image for automatic optimization
 * - Automatic format conversion (WebP/AVIF)
 * - Lazy loading by default
 * - Responsive images
 * - Blur placeholder support
 */

"use client";

import Image from 'next/image';
import React from 'react';
import { cn } from './utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
}

// Performance optimization: Memoized component prevents unnecessary re-renders
export const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 75,
  sizes,
  objectFit = 'cover',
  onLoad,
}: OptimizedImageProps) {
  // Performance optimization: Use placeholder blur for better UX
  const [isLoading, setIsLoading] = React.useState(true);

  const handleLoad = React.useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          style={{ objectFit }}
          quality={quality}
          priority={priority}
          sizes={sizes || "100vw"}
          onLoad={handleLoad}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "transition-opacity duration-300",
        isLoading ? "opacity-0" : "opacity-100",
        className
      )}
      quality={quality}
      priority={priority}
      sizes={sizes}
      onLoad={handleLoad}
    />
  );
});

OptimizedImage.displayName = "OptimizedImage";

