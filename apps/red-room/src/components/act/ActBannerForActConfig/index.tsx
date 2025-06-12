import React from 'react'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge';

import ActBannerTitle from './_components/ActBannerTitle';

import type { DataConfig } from '@/services/act/common/type'

type Props = {
  dataConfig: DataConfig
  bannerClassName?: string
  bannerTitleClassName?: string
}

const ActBannerForActConfig = ({ dataConfig, bannerClassName, bannerTitleClassName }: Props) => {

  return (
    <section className="w-full">
      <div className={twMerge('relative w-[750px] h-[950px]', bannerClassName)}>
        <Image src={dataConfig.banner.cover} alt="title" fill sizes='100%' priority className="object-contain" />
      </div>
      <div className={twMerge('absolute top-0 left-0 w-[750px] h-[250px]', bannerTitleClassName)}>
        <ActBannerTitle titleMapImage={dataConfig.banner.title} />
      </div>
    </section>
  )
}

export default ActBannerForActConfig