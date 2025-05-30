import React from 'react'

import { getTranslations } from 'next-intl/server'

import Space from '@/components/global/Space'

import ActDecorateContainerAsync from '../_components/ActClient/ActDecorateContainerAsync'

import ActRankRender from './_components/ActRankRender'

import type { Metadata } from 'next'

type Props = {
  params: Promise<{ activitiesId: string }>
}

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('agencyRank'),
  }
}

const Page = async ({ params }: Props) => {
  const { activitiesId } = await params
  try {
    return (
      <div className="w-full">
        <ActDecorateContainerAsync containerType="Ranking" isOnlyContent>
          <ActRankRender activitiesId={+activitiesId} />
          <Space h='h-[100px]' />
        </ActDecorateContainerAsync>
      </div>
    )
  } catch {
    return null
  }
}

export default Page
