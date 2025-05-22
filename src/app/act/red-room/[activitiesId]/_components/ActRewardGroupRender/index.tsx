'use client'
import React from 'react'

import { useQuery } from '@tanstack/react-query'

import ActRewardGroup from '@/components/act/ActRewardGroup'
import SkeletonGrid from '@/components/global/SkeletonGrid'

import { ActRewardGroupRenderConfig } from './config'

import { CommonActApi } from '@/services/act/common'

type Props = {
  activitiesId: number
}

const ActRewardGroupRender = ({ activitiesId }: Props) => {

  const { data: actRewardConfig, isLoading } = useQuery({
    queryKey: ['actRewardConfig', activitiesId],
    queryFn: () => CommonActApi.getActRewardConfig({ activitiesId: +activitiesId }),
    enabled: !!activitiesId,
  })
  const { rewardItemConfig } = ActRewardGroupRenderConfig

  const config = actRewardConfig?.userSendGiftRank

  const rewardsList = config?.userConfig

  if (isLoading) {
    return (
      <SkeletonGrid
        columns={1}
        rows={1}
        containerClassName='px-[60px]'
        cardClassName={rewardItemConfig.backgroundImageClassName} />
    )
  }

  return (
    <div className='flex flex-col gap-[50px] justify-center items-center px-[60px]'>
      {
        rewardsList?.map((rewards) => {
          return (
            <ActRewardGroup
              key={rewards.id}
              rewardItemConfig={rewardItemConfig}
              rewards={rewards.activityGiftConfigGroupGiftList}
              displayLayout={{
                display: '4',
                gap: 40
              }} />
          )
        })
      }
    </div>
  )
}

export default ActRewardGroupRender