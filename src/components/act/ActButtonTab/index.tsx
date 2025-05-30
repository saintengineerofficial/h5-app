'use client'
import React from 'react'

import { useMemoizedFn } from 'ahooks'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import ActButton from '@/components/act/ActButton'

type Props = {
  buttons: { text: string, link: string }[]
  imagePath: string
  activeImagePath: string
  className?: string
  textClassName?: string
  activeTextClassName?: string
}

const ActButtonTab = ({ buttons, imagePath, activeImagePath, className, textClassName, activeTextClassName }: Props) => {
  const pathname = usePathname();

  const isActive = useMemoizedFn((link: string) => {

    return link.includes(pathname);
  })


  return (
    <div className='w-full flex items-center justify-between'>
      {
        buttons.map((button) => (
          <ActButton
            key={button.link}
            imagePath={isActive(button.link) ? activeImagePath : imagePath}
            buttonText={button.text}
            link={button.link}
            className={twMerge(className, textClassName, isActive(button.link) && activeTextClassName)}
          />
        ))
      }
    </div>
  )
}

export default ActButtonTab