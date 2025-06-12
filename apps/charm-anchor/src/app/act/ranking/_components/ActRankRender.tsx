'use client'
import React from 'react'

import { useQuery } from '@tanstack/react-query'

import SkeletonGrid from '@/components/global/SkeletonGrid'

import ActPodiumRankingGroup from '../../_components/ActPodiumRankingGroup'
import ActRankingGroup from '../../_components/ActRankingGroup'
import { ActApi } from '../../_lib/api'
import DataEmptyError from '@/components/global/DataEmptyError'

type Props = {
  activitiesId: number
}

const ActRankRender = ({ activitiesId }: Props) => {

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['rankingList', activitiesId],
    queryFn: () => ActApi.getRanking(),
  })

  if (isLoading || !data) {
    return (
      <SkeletonGrid
        columns={1}
        rows={10}
        containerClassName='px-[60px] w-full pt-[150px]'
        cardClassName='w-[600px] h-[100px]' />
    )
  }

  if (isError) {
    return <DataEmptyError error={error} />
  }

  return (
    <div className='h-full flex flex-col'>
      <ActPodiumRankingGroup rankingList={data.res.slice(0, 3)} />
      <ActRankingGroup rankingList={data.res.slice(3)} />
    </div>
  )
}

export default ActRankRender