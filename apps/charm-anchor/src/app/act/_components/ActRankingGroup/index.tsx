import React from 'react'

import ActRanking from './ActRanking'

import type { RankingItem } from '../../_lib/api/type'
import DataEmptyError from '@/components/global/DataEmptyError'
type Props = {
  rankingList: RankingItem[]
}

const config = {
  backgroundImagePath: '/charm-anchor/me-bg-1.png',
  backgroundActiveImagePath: '/charm-anchor/me-bg-2.png',
  backgroundClassName: 'w-[670px] h-[161px]',

  numberImagePath: '/charm-anchor/me-bg-3.png',
  numberBackgroundClassName: 'w-[70px] h-[70px]',
  numberClassName: 'font-600 text-[34px] text-[#560000]',

  avatarDecorateImagePath: '/charm-anchor/avatar-user.png',
  avatarDecorateBackgroundClassName: 'w-[100px] h-[100px]',
  avatarClassName: 'size-[68px] z-[-1]',
}

const ActRankingGroup = ({ rankingList }: Props) => {
  if (!rankingList.length) {
    return <DataEmptyError data={rankingList} />
  }

  return (
    <div className='w-full flex flex-col gap-[5px]'>
      {rankingList.map((item, index) => (
        <div className='m-auto' key={item.uid}>
          <ActRanking rankingItem={item} rank={index} config={config} />
        </div>
      ))}
    </div>
  )
}

export default ActRankingGroup