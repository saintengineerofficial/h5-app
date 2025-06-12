import React, { type PropsWithChildren, Suspense } from 'react'

import { twMerge } from 'tailwind-merge';

import ActBannerForActConfig from '@/components/act/ActBannerForActConfig'
import ActCountdown from '@/components/act/ActCountdown';

import { getActBaseConfig } from '@/lib/services/serverActData'
import { str2Json } from '@/lib/utils/format-util'
import { formatTimestamp } from '@/lib/utils/time-utils';
import { ACTIVITIES_ID } from '@/constants/app';
import type { ExtConfig } from '@/services/act/common/type';

interface Props {
  children: React.ReactNode
}

const configSection = {
  bgColorClassName: "bg-[#230700]",
  bannerClassName: "h-[950px]",
  bannerTitleClassName: "w-[750px] h-[250px] top-[30px]",
}

const countdownConfig = {
  className: "relative z-10 w-[750px] -mt-[300px]",
  wrapperClassName: "w-[590px] h-[78px] m-auto bg-[url('/red-room/countdown-bg.png')] bg-no-repeat bg-center bg-cover",
  timeClassName: "w-[56px] h-[56px] text-[24px] text-[#FFFFFF]",
  textClassName: "text-[28px] text-[#FFFFFF]",
}

const ActLayout = async ({ children }: Props) => {
  const actBaseConfig = await getActBaseConfig(ACTIVITIES_ID)

  const extConfig: ExtConfig = str2Json(actBaseConfig.res.extConfig)
  return (
    <div className='w-screen min-h-screen h-full mx-auto overflow-x-hidden'>
      <main className={twMerge('relative w-full h-full', configSection.bgColorClassName)}>
        <ActBannerForActConfig
          dataConfig={extConfig.templateConfig.dataConfig}
          bannerClassName={configSection.bannerClassName}
          bannerTitleClassName={configSection.bannerTitleClassName}
        />
        <ActCountdown
          targetDate={formatTimestamp(1748698442 * 1000)}
          timeImagePath="/red-room/time-bg.png"
          {...countdownConfig}
        />
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  )

}

export default ActLayout