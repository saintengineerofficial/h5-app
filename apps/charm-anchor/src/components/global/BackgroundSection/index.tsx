import type { PropsWithChildren } from 'react';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface BackgroundSectionProps {
  imagePath: string;
  mode?: 'imageFill' | 'bgRepeatY';
  className?: string;
  overlayColor?: string;
  children?: React.ReactNode;
}

const BackgroundSection = ({
  imagePath,
  mode = 'imageFill',
  className = '',
  overlayColor = '',
  children,
}: PropsWithChildren<BackgroundSectionProps>) => {

  if (mode === 'bgRepeatY') {
    return (
      <div className={twMerge(`relative w-full flex-1 overflow-hidden`, className)}>
        <div
          className="absolute inset-0 w-full h-full bg-repeat-y bg-[100%_auto]"
          style={{ backgroundImage: `url(${imagePath})` }}
        />

        {overlayColor && <div className={`absolute inset-0 ${overlayColor}`} />}

        {children && (
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={twMerge(`relative w-full overflow-hidden`, className)}>
      <Image
        src={imagePath}
        alt="background"
        fill
        sizes='100%'
        className="object-contain"
      />

      {overlayColor && <div className={`absolute inset-0 ${overlayColor}`} />}

      {children && (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

export default BackgroundSection;