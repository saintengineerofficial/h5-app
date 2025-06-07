'use client'
import React from 'react'

import Space from '@/components/global/Space';

import ActDecorateContainer from '../_components/ActDecorateContainer'
import ActRewardGroupRender from '../_components/ActRewardGroupRender'

import { ACTIVITIES_ID } from '@/constants/app';

const Page = () => {

  return (
    <div className='w-full'>
      <ActDecorateContainer isOnlyContent containerType="Reward" className='z-10'>
        <div className='flex flex-col'>
          <Space h='h-[140px]' />
          <ActRewardGroupRender activitiesId={ACTIVITIES_ID} />
          <Space h='h-[140px]' />
        </div>
      </ActDecorateContainer>
    </div>
  )
}

export default Page