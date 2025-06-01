import React, { useMemo, type PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge';

type Props = {
  span?: number;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  gridColumn?: string;
}

const GridItem = ({ children, span, className, onClick, gridColumn }: PropsWithChildren<Props>) => {
  const style = useMemo(() => {
    const tempStyle: React.CSSProperties = {};

    if (span) {
      tempStyle.gridColumnEnd = `span ${span}`;
    }

    if (gridColumn) {
      tempStyle.gridColumn = gridColumn;
    }

    return tempStyle;
  }, [span, gridColumn])

  return (
    <div onClick={onClick} className={twMerge('grid-item flex justify-center items-center', className)} style={style}>
      {children}
    </div>
  )
}

export default GridItem;