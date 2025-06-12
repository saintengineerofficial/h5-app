'use client'

import React, { useRef } from 'react';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { useIntersectionObserver } from '@repo/hooks';

export interface ImageProps {
  src: string;
  alt?: string;
  loading?: string;
  lazy?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const base64 = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/x8AAqMB0Fk+W34AAAAASUVORK5CYII='

const InternalImage = (props: ImageProps) => {

  const { src, className, alt = '', loading = base64, lazy = false } = props

  const imgRef = useRef<HTMLImageElement | null>(null);

  const observerRef = useIntersectionObserver(imgRef, { freezeOnceVisible: true });

  return (
    <div className={twMerge('relative w-[150px] h-[150px]', className)}>
      <Image
        className='w-full h-full object-contain'
        ref={imgRef}
        src={observerRef?.isIntersecting || !lazy ? src : loading}
        alt={alt}
        draggable={false}
        fill
        sizes='100%'
        onClick={props.onClick}
        onLoad={props.onLoad}
        onError={props.onError}
      />
    </div>
  );
};

export default InternalImage;