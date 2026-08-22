import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  priority = false,
  width,
  height,
  fill = false,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (fill) {
    return (
      <div className="relative overflow-hidden w-full h-full">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        {hasError && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image not found</span>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...(priority && { fetchPriority: 'high' as const })}
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden inline-block">
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width, height }}
        />
      )}
      {hasError && (
        <div
          className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          style={{ width, height }}
        >
          <span className="text-gray-400 text-sm">Image not found</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...(priority && { fetchPriority: 'high' as const })}
      />
    </div>
  );
};

export default OptimizedImage;
