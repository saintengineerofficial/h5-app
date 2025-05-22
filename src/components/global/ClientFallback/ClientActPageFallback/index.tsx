'use client'

import { useState, useEffect } from 'react'

import ActBannerForActConfig from '@/components/act/ActBannerForActConfig'

import { str2Json } from '@/lib/utils/format-util'

const ClientActPageFallback = ({ activitiesId }: { activitiesId: number }) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [actConfig] = await Promise.all([
          import('@/lib/services/clientActData').then(m => m.getActBaseConfigClient(activitiesId)),
        ])

        const extConfig = str2Json(actConfig.res.extConfig)
        setData(extConfig)
      } catch (err) {
        setError(err as Error)
      }
    }

    fetchData()
  }, [activitiesId])

  if (error) {
    return <div>Failed to load data. Please try again later.</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <main className="w-full h-full">
      <ActBannerForActConfig actBannerConfig={data} bannerClassName="h-[950px]" bannerTitleClassName="w-[100px] h-[100px]" />
    </main>
  )
}

export default ClientActPageFallback
