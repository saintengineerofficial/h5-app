'use client'
import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'

import ActRewardGroup from '@/components/act/ActRewardGroup'
import BackgroundSectionAsync from '@/components/client/BackgroundSectionAsync'
import SkeletonGrid from '@/components/global/SkeletonGrid'

import { ActRewardGroupRenderConfig } from './config'

import { CommonActApi } from '@/services/act/common'

import type { LangKey } from '@/services/type'

type Props = {
  activitiesId: number
}

const titleMap: Record<number, string> = {
  0: '/charm-anchor/reward-title-01.png',
  1: '/charm-anchor/reward-title-02.png',
  2: '/charm-anchor/reward-title-03.png',
}

const ActRewardGroupRender = ({ activitiesId }: Props) => {
  const { data: actRewardConfig, isLoading } = useQuery({
    queryKey: ['actRewardConfig', activitiesId],
    queryFn: () => CommonActApi.getActRewardConfigProxy(),
    staleTime: 1000 * 60 * 60,
    enabled: !!activitiesId,
  })
  const locale = useLocale().toLowerCase() as LangKey

  const { rewardItemConfig } = ActRewardGroupRenderConfig

  const config = actRewardConfig?.userSendGiftRank

  const rewardsList = config?.userConfig

  if (isLoading) {
    return (
      <SkeletonGrid
        columns={2}
        rows={6}
        containerClassName='px-[60px]'
        cardClassName={rewardItemConfig.backgroundImageClassName} />
    )
  }

  return (
    <div className='flex flex-col gap-[50px] justify-center items-center px-[60px]'>
      {
        rewardsList?.map((rewards, index) => {
          return (
            <div key={rewards.id} className='flex flex-col items-center gap-[30px]'>
              <BackgroundSectionAsync imagePath={titleMap[index]} className='w-[441px] h-[111px]' >
                <span className='text-[40px] text-[#FFEC1C] font-bold'>{locale === 'zh' ? rewards.nameI18n['en'] : rewards.nameI18n[locale]}</span>
              </BackgroundSectionAsync>
              <ActRewardGroup
                rewardItemConfig={rewardItemConfig}
                rewards={rewards.activityGiftConfigGroupGiftList}
                displayLayout={{
                  display: '1x3',
                  gap: 40
                }} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ActRewardGroupRender