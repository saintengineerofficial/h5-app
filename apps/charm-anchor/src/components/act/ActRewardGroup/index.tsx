'use client'

import React, { useMemo } from 'react'

import { twMerge } from 'tailwind-merge';

import BackgroundSection from '@/components/global/BackgroundSection'
import Grid from '@/components/global/Grid';
import InternalImage from '@/components/global/InternalImage';

import { MoreThanThreeLayout } from './config';

import type { RewardGift } from '@/services/act/common/type'

type Props = {
  rewardItemConfig: {
    backgroundImage: string
    backgroundImageClassName: string
    rewardNameClassName: string
    rewardImageClassName: string
  }
  rewards: RewardGift[]
  displayLayout: {
    display: keyof typeof MoreThanThreeLayout
    gap?: number | string | [number | string, number | string];
  }
}

const RewardGroup = ({ rewards, rewardItemConfig, displayLayout }: Props) => {

  const matchWidth = rewardItemConfig.backgroundImageClassName.match(/w-\[[^\]]+\]/);
  const finalWidth = matchWidth ? matchWidth[0] : 'w-[200px]';

  const { display, gap } = displayLayout

  const currentLayout = useMemo(() => {
    if (rewards.length > 2) {
      return MoreThanThreeLayout[display]
    }
    return {
      columns: rewards.length,
      rows: 1
    };
  }, [displayLayout, rewards.length])

  return (
    <Grid {...currentLayout} gap={gap}>
      {rewards.map((reward) => {
        return (
          <Grid.Item key={reward.id} className='flex-col'>
            <BackgroundSection imagePath={rewardItemConfig.backgroundImage} className={twMerge('w-[200px] h-[200px]', rewardItemConfig.backgroundImageClassName)}>
              <InternalImage src={reward.cover} alt="rewardBackgroundImage" className={rewardItemConfig.rewardImageClassName} />
            </BackgroundSection>
            <div className={twMerge(`${finalWidth} text-center break-words whitespace-normal text-[24px] text-white`,
              rewardItemConfig.rewardNameClassName)}>
              {reward.name}
            </div>
          </Grid.Item>
        )
      })}
    </Grid>
  )
}

export default RewardGroup