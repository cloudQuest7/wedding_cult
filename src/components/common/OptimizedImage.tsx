import { forwardRef } from 'react';

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onClick?: () => void;
  loading?: "lazy" | "eager";
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(({ 
  src, 
  alt, 
  className = '', 
  onLoad, 
  onClick,
  loading = "lazy"
}, ref) => {
  // Use imagekit.io transformation parameters if the image is from imagekit
  const optimizedUrl = src.includes('imagekit.io') 
    ? `${src}${src.includes('?') ? '&' : '?'}tr=q-80,f-auto`
    : src;

  return (
    <img
      ref={ref}
      src={optimizedUrl}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onClick={onClick}
      loading={loading}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
