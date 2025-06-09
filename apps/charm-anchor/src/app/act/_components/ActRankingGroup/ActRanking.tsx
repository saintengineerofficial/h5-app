'use client'
import React from 'react'

import appBridge from '@yg/app-bridge';

import ActDecorateAvatar from '@/components/act/ActDecorateAvatar';
import BackgroundSectionAsync from '@/components/client/BackgroundSectionAsync'
import InternalImage from '@/components/global/InternalImage';
import Space from '@/components/global/Space';

import { numberToScore } from '@/lib/utils/format-util';

import type { RankingItem } from '../../_lib/api/type'

type Props = {
  rankingItem: RankingItem
  rank: number
  config: {
    backgroundImagePath: string
    backgroundActiveImagePath: string
    backgroundClassName: string

    numberImagePath: string
    numberBackgroundClassName: string
    numberClassName: string

    avatarDecorateImagePath: string
    avatarDecorateBackgroundClassName: string
    avatarClassName: string
  }
}

const ActRanking = ({ rankingItem, rank, config }: Props) => {
  const currentUid = appBridge.getAppUid()
  const finalImagePath = currentUid === rankingItem.uid ? config.backgroundActiveImagePath : config.backgroundImagePath
  return (
    <BackgroundSectionAsync imagePath={finalImagePath} className={config.backgroundClassName}>
      <div className='w-full flex items-center px-[62px] pt-[20px]'>
        <BackgroundSectionAsync imagePath={config.numberImagePath} className={config.numberBackgroundClassName} >
          <p className={config.numberClassName}>{rank + 1 + 3}</p>
        </BackgroundSectionAsync>
        <Space w='w-[15px]' />
        <ActDecorateAvatar
          avatarUrl={rankingItem.avatarurl}
          uid={rankingItem.uid}
          backgroundImagePath={config.avatarDecorateImagePath}
          backgroundClassName={config.avatarDecorateBackgroundClassName}
          avatarClassName={config.avatarClassName} />
        <Space w='w-[25px]' />
        <div className='flex flex-col'>
          <div className='text-white text-[26px] max-w-[200px] font-500 truncate'>{rankingItem.nickname}</div>
          <div className='text-white text-[22px]'>ID: {rankingItem.uid}</div>
        </div>
        <div className='flex items-center gap-[6px] ml-auto'>
          <p className='text-[#FEF15B] font-500 text-[30px]'>{numberToScore(rankingItem.val)}</p>
          <InternalImage src='/charm-anchor/icon-coin.png' className='w-[22px] h-[22px]' />
        </div>
      </div>
    </BackgroundSectionAsync>
  )
}

export default ActRanking