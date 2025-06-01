'use client'
import React from 'react'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import BackgroundSectionAsync from '@/components/client/BackgroundSectionAsync'
import { Button } from '@/components/ui/button'
type Props = {
  imagePath: string
  buttonText: string
  link?: string
  wrapperClassName?: string
  className?: string
  onClick?: () => void
}

const ActButton = ({ imagePath, buttonText, link, onClick, className, wrapperClassName }: Props) => {

  return (
    <div className={twMerge(wrapperClassName)}>
      <BackgroundSectionAsync imagePath={imagePath} className={twMerge('w-[358px] h-[134px]', className)}>
        <Button
          variant="link"
          className={twMerge('absolute -translate-x-1/2 left-1/2 text-[28px] text-[#FFFFFF] font-bold', className)}
          onClick={onClick}
          asChild>
          {link ? (
            <Link href={link}>
              <span>{buttonText}</span>
            </Link>
          ) : (
            <span>{buttonText}</span>
          )}
        </Button>
      </BackgroundSectionAsync>
    </div>
  )
}

export default ActButton