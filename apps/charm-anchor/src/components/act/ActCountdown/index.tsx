'use client'
import React, { useMemo } from 'react'

import { useCountDown } from 'ahooks'
import { twMerge } from 'tailwind-merge'

import BackgroundSectionAsync from '@/components/client/BackgroundSectionAsync'

type CountdownProps = {
  targetDate: string
  timeImagePath: string
  className?: string
  wrapperClassName?: string
  timeClassName?: string
  textClassName?: string
}

const TimeBox = ({ value, label, imagePath, timeClassName, textClassName }: {
  value: number;
  label?: string;
  imagePath: string;
  timeClassName?: string;
  textClassName?: string;
}) => (
  <>
    <BackgroundSectionAsync imagePath={imagePath} className={twMerge('w-[100px] h-[100px]', timeClassName)}>
      {value < 10 ? `0${value}` : value}
    </BackgroundSectionAsync>
    {label && (
      <div className={twMerge('text-[24px] font-bold text-[#fff]', textClassName)}>{label}</div>
    )}
  </>
)

const ActCountdown = (props: CountdownProps) => {
  const { targetDate, timeImagePath, className, timeClassName, textClassName, wrapperClassName } = props
  const [, formattedRes] = useCountDown({
    targetDate,
  })

  const { days, hours, minutes, seconds } = formattedRes

  const countdownDisplay = useMemo(() => (
    <div className={twMerge('w-full flex justify-center items-center', className)}>
      <div className={twMerge('flex items-center justify-center gap-[10px]', wrapperClassName)}>
        <TimeBox
          value={days}
          label="days"
          imagePath={timeImagePath}
          timeClassName={timeClassName}
          textClassName={textClassName}
        />
        <TimeBox
          value={hours}
          label=":"
          imagePath={timeImagePath}
          timeClassName={timeClassName}
          textClassName={textClassName}
        />
        <TimeBox
          value={minutes}
          label=":"
          imagePath={timeImagePath}
          timeClassName={timeClassName}
          textClassName={textClassName}
        />
        <TimeBox
          value={seconds}
          imagePath={timeImagePath}
          timeClassName={timeClassName}
        />
      </div>
    </div>
  ), [days, hours, minutes, seconds, timeImagePath, className, timeClassName, textClassName])

  return countdownDisplay
}

export default ActCountdown