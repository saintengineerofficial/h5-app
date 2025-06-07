'use client'
import React, { use } from 'react'

import Space from '@/components/global/Space';

import ActDecorateContainer from '../_components/ActDecorateContainer'
import ActRewardGroupRender from '../_components/ActRewardGroupRender'

const Page = () => {
  const activitiesId = process.env.NEXT_PUBLIC_ACTIVITIES_ID!

  return (
    <div className='w-full'>
      <ActDecorateContainer isOnlyContent containerType="Reward" className='z-10'>
        <div className='flex flex-col'>
          <Space h='h-[140px]' />
          <ActRewardGroupRender activitiesId={+activitiesId} />
          <Space h='h-[140px]' />
        </div>
      </ActDecorateContainer>
    </div>
  )
}

export default Page