import React from 'react'

import { twMerge } from 'tailwind-merge';

import ActBannerForActConfig from '@/components/act/ActBannerForActConfig'
import ActButtonTab from '@/components/act/ActButtonTab';
import ActCountdown from '@/components/act/ActCountdown';
import Space from '@/components/global/Space';

import Rule from './_components/actPopup/rule';

import { getActBaseConfig } from '@/lib/services/serverActData'
import { str2Json } from '@/lib/utils/format-util'
import { formatTimestamp } from '@/lib/utils/time-utils';
import { ACTIVITIES_ID } from '@/constants/app';

interface Props {
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
  imagePath: "/tab-2.png",
  activeImagePath: "/tab-1.png",
  className: "w-[358px] h-[134px]",
  textClassName: "top-[10px] text-[#DD9FA0] text-[32px]",
  activeTextClassName: "text-[#FFEC1C]",
}

const ActLayout = async ({ children }: Props) => {

  const actBaseConfig = await getActBaseConfig(ACTIVITIES_ID)

  const actEndTime = actBaseConfig.res.endTime

  const extConfig = str2Json(actBaseConfig.res.extConfig)

  const buttons = [
    { text: "榜单", link: '/charm-anchor/ranking' },
    { text: "奖励", link: '/charm-anchor/reward' },
  ]

  return (
    <div className='w-screen min-h-screen h-full mx-auto overflow-x-hidden'>
      <main className={twMerge('relative w-full h-full bg-[#2d060f]')}>
        <ActBannerForActConfig
          actBannerConfig={extConfig}
          bannerClassName={bannerSection.bannerClassName}
          bannerTitleClassName={bannerSection.bannerTitleClassName}
        />
        <Rule />
        <ActCountdown
          targetDate={formatTimestamp(actEndTime * 1000)}
          timeImagePath="/time-bg.png"
          {...countdownConfig}
        />
        <Space h='h-[20px]' />
        <ActButtonTab
          buttons={buttons}
          {...buttonTabConfig}
        />
        {children}
      </main>
    </div>
  )
}


export default ActLayout