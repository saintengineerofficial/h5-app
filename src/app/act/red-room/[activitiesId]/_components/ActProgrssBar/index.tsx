import React from 'react';

import { twMerge } from 'tailwind-merge';

interface Props {
  current?: number;
  total?: number;
  showText?: boolean;
  className?: string;
}

const ActProgrssBar = ({
  current = 0,
  total = 5,
  showText = true,
  className = '',
}: Props) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={twMerge('w-[364px] h-[40px]', className)}>
      <div className="relative h-full w-full rounded-full overflow-hidden border border-white/10 shadow-md bg-[#3a0000]">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(to right, #ffcc00, #ffee00)',
            boxShadow: '0 0 15px rgba(255, 204, 0, 0.5)',
          }}
        />
        {showText && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-red-600 text-[28px] font-bold drop-shadow">
            {current}/{total}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActProgrssBar;
