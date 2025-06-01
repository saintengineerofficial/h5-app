'use client'
import React from 'react'

import ActPodiumRanking from './ActPodiumRanking';

import type { RankingItem } from '../../_lib/api/type';

type Props = {
  rankingList: RankingItem[]
}

const PodiumRankingConfigs = [
  {
    className: 'translate-y-[100px] translate-x-[-50%] left-1/2 z-[1]',
    backgroundImagePath: '/charm-anchor/room-top-1.png',
    backgroundClassName: 'w-[560px] h-[500px]',
    avatarClassName: 'size-[176px] top-[100px] translate-x-[-50%] left-1/2',
    infoClassName: 'bottom-[80px] max-w-[100px]',
    coinClassName: 'bottom-[20px]',
  },
  {
    className: 'translate-y-[250px] left-0 z-[2]',
    backgroundImagePath: '/charm-anchor/room-top-2.png',
    backgroundClassName: 'w-[270px] h-[410px]',
    avatarClassName: 'size-[140px] top-[70px] translate-x-[-50%] left-1/2',
    infoClassName: 'bottom-[70px]',
    coinClassName: 'bottom-[20px]',
  },
  {
    className: 'translate-y-[250px] right-0 z-[2]',
    backgroundImagePath: '/charm-anchor/room-top-3.png',
    backgroundClassName: 'w-[270px] h-[410px]',
    avatarClassName: 'size-[140px] top-[70px] translate-x-[-50%] left-1/2',
    infoClassName: 'bottom-[70px]',
    coinClassName: 'bottom-[20px]',
  },
]
const ActPodiumRankingGroup = ({ rankingList }: Props) => {

  return (
    <div className='h-[650px] flex items-start relative'>
      <ActPodiumRanking rankingItem={rankingList[1]} config={PodiumRankingConfigs[1]} />
      <ActPodiumRanking rankingItem={rankingList[0]} config={PodiumRankingConfigs[0]} />
      <ActPodiumRanking rankingItem={rankingList[2]} config={PodiumRankingConfigs[2]} />
    </div>
  )
}

export default ActPodiumRankingGroup