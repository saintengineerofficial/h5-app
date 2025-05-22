import React from 'react'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge';

import ActBannerTitle from './_components/ActBannerTitle';

import type { ExtConfig } from '@/services/act/common/type'

type Props = {
  actBannerConfig: ExtConfig
  bannerClassName?: string
  bannerTitleClassName?: string
}

const ActBannerForActConfig = ({ actBannerConfig, bannerClassName, bannerTitleClassName }: Props) => {
  const { banner } = actBannerConfig.templateConfig.dataConfig

  return (
    <section className="w-full">
      <div className={twMerge('relative w-[750px] h-[950px]', bannerClassName)}>
        <Image src={banner.cover} alt="title" fill priority className="object-contain" />
      </div>
      <div className={twMerge('absolute top-0 left-0 w-[750px] h-[250px]', bannerTitleClassName)}>
        <ActBannerTitle titleMapImage={banner.title} />
      </div>
    </section>
  )
}

export default ActBannerForActConfig