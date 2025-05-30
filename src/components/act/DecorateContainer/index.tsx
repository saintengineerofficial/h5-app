import React, { useMemo, type PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge';

import ActTopTitle from '@/components/act/ActTopTitle';
import BackgroundSection from '@/components/global/BackgroundSection';

import { getCssWHNumber, px2vw } from '@/lib/utils/format-util';

type Props = {
  titleSection: {
    title?: string
    className?: string
  }
  topSection: {
    imageUrl: string
    className: string
  }
  middleSection: {
    imageUrl: string
    className: string
  }
  bottomSection: {
    imageUrl: string
    className: string
  }
  isOnlyContent: boolean
  className?: string,
}

const DecorateContainer = ({
  children,
  titleSection,
  topSection,
  middleSection,
  bottomSection,
  isOnlyContent = false,
  className
}: PropsWithChildren<Props>) => {

  // 计算最小高度
  const finalMinHeight = useMemo(() => {
    const topSectionHeight = getCssWHNumber('h', topSection.className);
    const middleSectionHeight = getCssWHNumber('h', middleSection.className);
    const bottomSectionHeight = getCssWHNumber('h', bottomSection.className);

    return px2vw(topSectionHeight + middleSectionHeight + bottomSectionHeight)
  }, [bottomSection.className, middleSection.className, topSection.className])

  return (
    <div className={twMerge("relative", className)} >
      <div className="absolute inset-0 w-full h-full flex flex-col">
        <BackgroundSection
          imagePath={topSection.imageUrl}
          className={topSection.className}
        />

        <BackgroundSection
          imagePath={middleSection.imageUrl}
          mode="bgRepeatY"
          className={middleSection.className}
        />

        <BackgroundSection
          imagePath={bottomSection.imageUrl}
          className={bottomSection.className}
        />
      </div>

      {/* 内容层 - 覆盖在背景图层上方 */}
      <div className="relative z-10 w-full flex flex-col" style={{ minHeight: finalMinHeight }}>
        {!isOnlyContent && <ActTopTitle className={topSection.className} title={titleSection?.title} titleClassName={titleSection?.className} />}
        {children}
        {!isOnlyContent && (<div className={twMerge("w-full", bottomSection.className)} />)}
      </div>
    </div>
  )
}

export default DecorateContainer