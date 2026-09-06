import { FC, SyntheticEvent, useState } from 'react';
import { TImage } from '../../types/type';
import './image.scss';

const parseDimension = (value: string | number | undefined) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') {
    return parseInt(value, 10);
  }
  return undefined;
};

const getImageClassName = (
  className: string,
  isLoading: boolean,
  hasError: boolean,
  isDisabled: boolean
) => {
  const classes = [className || 'image-tag'];

  if (isLoading) classes.push('loading');
  if (hasError) classes.push('error');
  if (isDisabled) classes.push('disabled');

  return classes.join(' ');
};

const getLoadingMode = (isLazy: boolean): 'lazy' | 'eager' =>
  isLazy ? 'lazy' : 'eager';

const getFallbackSource = (fallbackSrc: string) => fallbackSrc || '';

export const Image: FC<TImage> = ({
  src = '',
  alt = '',
  width = '',
  height = '',
  className = '',
  onClick,
  onError,
  role = '',
  isLazy = true,
  fallbackSrc = '',
  isDisabled = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    setIsLoading(false);

    const target = e.target as HTMLImageElement;
    target.src = getFallbackSource(fallbackSrc);

    onError?.(e, src);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imgClassName = getImageClassName(
    className,
    isLoading,
    hasError,
    isDisabled
  );
  const parsedWidth = parseDimension(width);
  const parsedHeight = parseDimension(height);
  const loadingMode = getLoadingMode(isLazy);

  return (
    <img
      src={src}
      alt={alt}
      width={parsedWidth}
      height={parsedHeight}
      className={imgClassName}
      onClick={onClick}
      onError={handleError}
      onLoad={handleLoad}
      role={role}
      loading={loadingMode}
      aria-disabled={isDisabled}
    />
  );
};

