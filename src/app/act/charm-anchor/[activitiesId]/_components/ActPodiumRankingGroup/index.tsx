'use client'
import React from 'react'

import ActPodiumRanking from './ActPodiumRanking';

import type { RankingItem } from '../../_lib/server/type';

type Props = {
  rankingList: RankingItem[]
}

const PodiumRankingConfigs = [
  {
    className: 'top-[180px] left-0',
    backgroundImagePath: '/charm-anchor/room-top-2.png',
    backgroundClassName: 'w-[270px] h-[410px]',
    avatarClassName: 'size-[140px] top-[170px] translate-x-[-50%] left-1/2',
    infoClassName: 'bottom-[70px]',
    coinClassName: 'bottom-[20px]',
  },
  {
    className: 'top-0 translate-x-[-50%] left-1/2',
    backgroundImagePath: '/charm-anchor/room-top-1.png',
    backgroundClassName: 'w-[560px] h-[500px]',
    avatarClassName: 'size-[176px] top-[200px] translate-x-[-50%] left-1/2',
    infoClassName: 'bottom-[80px]',
    coinClassName: 'bottom-[20px]',
  },
  {
    className: 'top-[180px] right-0',
    backgroundImagePath: '/charm-anchor/room-top-3.png',
    backgroundClassName: 'w-[270px] h-[410px]',
    avatarClassName: 'size-[140px] top-[170px] translate-x-[-50%] left-1/2',
    infoClassName: 'bottom-[70px]',
    coinClassName: 'bottom-[20px]',
  },
]
const ActPodiumRankingGroup = ({ rankingList }: Props) => {

  return (
    <div className='h-[700px] flex items-center relative'>
      <ActPodiumRanking rankingItem={rankingList[1]} config={PodiumRankingConfigs[1]} />
      <ActPodiumRanking rankingItem={rankingList[0]} config={PodiumRankingConfigs[0]} />
      <ActPodiumRanking rankingItem={rankingList[2]} config={PodiumRankingConfigs[2]} />
    </div>
  )
}

export default ActPodiumRankingGroup