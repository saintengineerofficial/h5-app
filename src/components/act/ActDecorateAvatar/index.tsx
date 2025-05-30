import React from 'react'

import { twMerge } from 'tailwind-merge'

import BackgroundSectionAsync from '@/components/client/BackgroundSectionAsync'
import InternalAvatar from '@/components/global/InternalAvatar'

type Props = {
  avatarUrl: string
  uid: number
  backgroundImagePath: string
  backgroundClassName: string
  avatarClassName: string
}

const ActDecorateAvatar = ({ avatarUrl, uid, backgroundImagePath, backgroundClassName, avatarClassName }: Props) => {
  return (
    <div className='relative'>
      <InternalAvatar src={avatarUrl} uid={uid} className={twMerge('size-[120px] absolute translate-x-[-50%] left-1/2 top-[10px]', avatarClassName)} />
      <BackgroundSectionAsync imagePath={backgroundImagePath} className={twMerge(backgroundClassName)} />
    </div>
  )
}

export default ActDecorateAvatar