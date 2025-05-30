'use client'
import React, { useMemo } from 'react'

import Image from 'next/image'
import { useLocale } from 'next-intl'

import type { DataConfigBannerTitle } from '@/services/act/common/type'

type Props = {
  titleMapImage: DataConfigBannerTitle
}

const ActBannerTitle = ({ titleMapImage }: Props) => {
  const locale = useLocale().toUpperCase() as keyof DataConfigBannerTitle

  const titleImage = useMemo(() => {
    if (!titleMapImage) {
      return null
    }

    const currentLocaleImage = titleMapImage[locale]
    if (!currentLocaleImage) {
      return titleMapImage['EN'] || null
    }

    return currentLocaleImage
  }, [titleMapImage, locale])

  if (!titleImage) {
    return null
  }

  return <Image src={titleImage} fill sizes='100%' alt="title" className='object-contain' />
}

export default ActBannerTitle
