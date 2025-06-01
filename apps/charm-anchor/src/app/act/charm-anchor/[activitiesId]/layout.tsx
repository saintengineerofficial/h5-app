import React, { type PropsWithChildren, Suspense } from 'react'

import { twMerge } from 'tailwind-merge';

import ActBannerForActConfig from '@/components/act/ActBannerForActConfig'
import ActButtonTab from '@/components/act/ActButtonTab';
import ActCountdown from '@/components/act/ActCountdown';
import ClientActPageFallback from '@/components/global/ClientFallback/ClientActPageFallback';
import Space from '@/components/global/Space';

import Rule from './_components/actPopup/rule';

import { getActBaseConfig } from '@/lib/services/serverActData'
import { str2Json } from '@/lib/utils/format-util'
import { formatTimestamp } from '@/lib/utils/time-utils';

interface Props {
  params: Promise<{ activitiesId: string }>
  children: React.ReactNode
}

const bannerSection = {
  bannerClassName: "h-[1200px]",
  bannerTitleClassName: "w-screen h-[280px] top-0",
}

const countdownConfig = {
  className: "relative z-10 -mt-[300px]",
  wrapperClassName: "m-auto",
  timeClassName: "w-[80px] h-[80px] text-[32px] text-[#560000]",
  textClassName: "text-[32px] text-[#fff]",
}

const buttonTabConfig = {
  imagePath: "/charm-anchor/tab-2.png",
  activeImagePath: "/charm-anchor/tab-1.png",
  className: "w-[358px] h-[134px]",
  textClassName: "top-[10px] text-[#DD9FA0] text-[32px]",
  activeTextClassName: "text-[#FFEC1C]",
}

const ActLayout = async ({ children, params }: Props) => {
  const { activitiesId } = await params

  try {
    const actBaseConfig = await getActBaseConfig(+activitiesId)

    const actEndTime = actBaseConfig.res.endTime

    const extConfig = str2Json(actBaseConfig.res.extConfig)

    const rankingLink = `/act/charm-anchor/${activitiesId}/ranking?translateId=544`
    const rewardLink = `/act/charm-anchor/${activitiesId}/reward?translateId=544`

    const buttons = [
      { text: "榜单", link: rankingLink },
      { text: "奖励", link: rewardLink },
    ]

    return (
      // 背景色
      <main className={twMerge('relative w-full h-full bg-[#2d060f]')}>
        <ActBannerForActConfig
          actBannerConfig={extConfig}
          bannerClassName={bannerSection.bannerClassName}
          bannerTitleClassName={bannerSection.bannerTitleClassName}
        />
        <Rule />
        <ActCountdown
          targetDate={formatTimestamp(actEndTime * 1000)}
          timeImagePath="/charm-anchor/time-bg.png"
          {...countdownConfig}
        />
        <Space h='h-[20px]' />
        <ActButtonTab
          buttons={buttons}
          {...buttonTabConfig}
        />
        {children}
      </main>
    )
  } catch (error) {
    console.error('Error loading activity data:', error)
    return (
      <ClientActPageFallback activitiesId={+activitiesId} />
    )
  }
}


export default ActLayout