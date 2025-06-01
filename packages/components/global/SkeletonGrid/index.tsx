import React from 'react';

import { twMerge } from 'tailwind-merge';

interface SkeletonCardProps {
  className?: string
}

interface SkeletonRowProps {
  columns?: number,
  cardClassName?: string
}

interface SkeletonGridProps {
  rows?: number,
  columns?: number,
  cardClassName?: string,
  containerClassName?: string
}

// 骨架屏单元格组件
const SkeletonCard = ({ className }: SkeletonCardProps) => (
  <div className={twMerge('h-[200px] rounded-xl bg-gray-200 animate-pulse', className)} />
);

// 骨架屏行组件
const SkeletonRow = ({ columns = 4, cardClassName }: SkeletonRowProps) => (
  <div className="m-auto grid gap-10" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
    {[...Array(columns)].map((_, index) => (
      <SkeletonCard key={index} className={cardClassName} />
    ))}
  </div>
);

// 主骨架屏网格组件
const SkeletonGrid = ({ rows = 2, columns = 4, cardClassName, containerClassName }: SkeletonGridProps) => {
  return (
    <div className={twMerge('flex flex-col justify-center items-center gap-[20px]', containerClassName)}>
      {[...Array(rows)].map((_, index) => (
        <SkeletonRow
          key={index}
          columns={columns}
          cardClassName={twMerge('h-[200px]', cardClassName)}
        />
      ))}
    </div>
  );
};

export default SkeletonGrid;
export { SkeletonCard, SkeletonRow };