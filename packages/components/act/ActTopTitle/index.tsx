import React from 'react'

import { twMerge } from 'tailwind-merge'

type Props = {
  title: string | React.ReactNode
  className?: string
  titleClassName?: string
}

const TopTitle = ({ className, title, titleClassName }: Props) => {
  return (
    <div className={twMerge("relative w-full h-full flex items-center justify-center", className)}>
      <div className={twMerge("absolute top-[70px] text-[36px] font-bold text-white flex justify-center", titleClassName)}>{title}</div>
    </div>
  )
}

export default TopTitle