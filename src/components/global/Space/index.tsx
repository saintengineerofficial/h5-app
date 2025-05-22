import React, { type PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge';

type WidthClass = `w-${number}` | `w-[${number}px]`; // 支持 w-10, w-[10px] 等
type HeightClass = `h-${number}` | `h-[${number}px]`; // 支持 h-10, h-[10px] 等

type Props = {
  w?: WidthClass;
  h?: HeightClass;
};

const Space = ({ children, w, h }: PropsWithChildren<Props>) => {
  return <div className={twMerge('w-full h-full', w, h)}>{children}</div>
}

export default Space