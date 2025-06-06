import React from 'react'

import { twMerge } from 'tailwind-merge';

import BackgroundSectionAsync from '@/components/client/BackgroundSectionAsync'
import InternalAvatar from '@/components/global/InternalAvatar';
import InternalImage from '@/components/global/InternalImage';

import { numberToScore } from '@/lib/utils/format-util';

import type { RankingItem } from '../../_lib/api/type';

type Props = {
  rankingItem: RankingItem
  config: {
    className: string
    avatarClassName: string
    backgroundImagePath: string
    backgroundClassName: string
    coinClassName: string
    infoClassName: string
  }
}

const ActPodiumRanking = ({ rankingItem, config }: Props) => {
  return (
    <div className={twMerge('absolute', config.className)}>
      <InternalAvatar
        src={rankingItem.avatarurl}
        uid={rankingItem.uid}
        className={twMerge('absolute size-[176px] translate-x-[-50%] left-1/2', config.avatarClassName)}
      />
      <BackgroundSectionAsync imagePath={config.backgroundImagePath}
        className={twMerge('pointer-events-none size-[176px] translate-x-[-50%] left-1/2', config.backgroundClassName)}
      >
        <div className={twMerge(
          'absolute bottom-[60px] translate-x-[-50%] left-1/2 flex flex-col items-center justify-center w-full text-[#FFf] text-[24px] font-400',
          config.infoClassName
        )}>
          <p className='truncate max-w-[180px]'>{rankingItem.nickname}</p>
          <p className='font-900 whitespace-nowrap'>ID: {rankingItem.uid}</p>
        </div>
        <div className={twMerge(
          'absolute bottom-[20px] translate-x-[-50%] left-1/2 flex items-center gap-[5px] text-[#FFf] text-[28px] font-400',
          config.coinClassName
        )}>
          <span>{numberToScore(rankingItem.val)}</span>
          <InternalImage src='/icon-coin.png' alt='coin' className='size-[22px]' />
        </div>
      </BackgroundSectionAsync>
    </div >
  )
}

export default ActPodiumRanking