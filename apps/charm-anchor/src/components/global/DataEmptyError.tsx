'use client'
import Image from 'next/image'
import React from 'react'

type Props = {
  error?: any
  data?: any
}

const DataEmptyError = ({ error, data }: Props) => {
  if (!error || !data.length || !data?.res?.length) {
    return (
      <div className='h-[1000px] w-screen flex flex-col items-center justify-center gap-2'>
        <Image src='https://web.boli.live/activity-web/upload/common/yigo-error-v2/error-empty-app.png' alt='error' width={100} height={100} />
        <span className='text-[#fff] text-[26px] font-600'>No data</span>
      </div>
    )
  }

  return (
    <div className='h-[400px] w-screen flex flex-col items-center justify-center gap-2'>
      <Image src='https://web.boli.live/activity-web/upload/common/yigo-error-v2/error-request.png' alt='error' width={100} height={100} />
      <span className='text-[#fff] text-[26px] font-600'>{error?.message?.error || 'fetch error'}</span>
    </div>
  )
}

export default DataEmptyError