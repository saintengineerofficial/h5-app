import React, { Suspense } from 'react'

import { getTranslations } from 'next-intl/server'

import ActProgrssBar from '@/components/act/ActProgrssBar'
import ActTopTitle from '@/components/act/ActTopTitle'
import BackgroundSectionAsync from '@/components/client/BackgroundSectionAsync'
import Space from '@/components/global/Space'
import { Skeleton } from '@/components/ui/skeleton'

import ActDecorateContainerAsync from './_components/ActClient/ActDecorateContainerAsync'
import ActDecorateContainer from './_components/ActDecorateContainer'
import ActRewardGroupRender from './_components/ActRewardGroupRender'

import type { Metadata } from 'next'
import { ACTIVITIES_ID } from '@/constants/app'


export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('agencyRank'),
  }
}

const Page = async () => {
  const t = await getTranslations();
  try {
    return (
      <div className="w-full">
        <ActDecorateContainer isOnlyContent containerType="Reward" className='z-10'>
          <div className='flex flex-col'>
            <ActTopTitle className='h-[200px]' title={t('reward')} />
            <Suspense fallback={<Skeleton className='w-[750px] h-[200px]' />}>
              <ActRewardGroupRender activitiesId={ACTIVITIES_ID} />
            </Suspense>
            <Space h='h-[10px]' />
            <ActProgrssBar current={3} total={5} className='m-auto' />
            <Space h='h-[100px]' />
          </div>
        </ActDecorateContainer>

        <BackgroundSectionAsync imagePath='/red-room/center-bg.png' className='w-[750px] h-[400px] z-1 -mt-[200px]' />

        <ActDecorateContainerAsync containerType="Rules" title={t('rule')} className='-mt-[150px] z-10'>
          <article className='px-[100px] text-[24px] text-[#370200]'>
            {t('desc')}
          </article>
        </ActDecorateContainerAsync>

        <BackgroundSectionAsync imagePath='/red-room/bottom-bg.png'
          className='w-[750px] h-[300px] bg-[center_bottom] -mt-[200px] z-1' />

      </div>
    )
  } catch {
    return null
  }
}

export default Page
