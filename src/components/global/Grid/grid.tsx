import React, { useMemo, type PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge';

import { px2vw } from '@/lib/utils/format-util';

type Props = {
  columns: number
  rows: number
  itemPositions?: {
    columnStart: number;
    columnEnd: number;
  }[];
  gap?: number | string | [number | string, number | string];
  className?: string;
}

const Grid = ({ children, columns, rows, itemPositions, gap, className }: PropsWithChildren<Props>) => {

  const style: React.CSSProperties = useMemo(() => {
    if (className) {
      return {}
    }

    const tempStyle: React.CSSProperties = {
      rowGap: px2vw(10),
      columnGap: px2vw(10),
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    }

    if (gap) {
      if (Array.isArray(gap)) {
        const [gapV, gapH] = gap;
        tempStyle.rowGap = px2vw(gapV)
        tempStyle.columnGap = px2vw(gapH)
      } else {
        tempStyle.rowGap = px2vw(gap)
        tempStyle.columnGap = px2vw(gap)
      }
    }

    return tempStyle
  }, [columns, gap, className])

  const wrappedChildren = useMemo(() => {
    if (itemPositions && React.Children.count(children) > 0) {
      return React.Children.map(children, (child, index) => {
        if (index < itemPositions.length) {
          const position = itemPositions[index];
          return (
            <div
              style={{
                gridColumnStart: position.columnStart,
                gridColumnEnd: position.columnEnd
              }}
              className="flex justify-center items-center"
            >
              {child}
            </div>
          );
        }
        return child;
      });
    }
    return children;
  }, [children, columns, itemPositions]);

  return (
    <div className={twMerge(`grid`, className)} style={style}>
      {wrappedChildren}
    </div>
  )
}


export default Grid;