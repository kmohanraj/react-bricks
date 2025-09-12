import { FC, SyntheticEvent } from 'react';
import { TImage } from '../../types/type';
import './image.scss';

export const Image: FC<TImage> = ({
  src = '',
  alt = '',
  width = '',
  height = '',
  className = '',
  onClick,
  onError,
  role = ''
}) => {

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = '';
    onError && onError(e, typeof src === 'string' ? src : '');
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className ? className : 'image-tag'}
      onClick={onClick}
      onError={(e) => handleError(e)}
      role={role}
    />
  );
};

