'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import ActButton from '@/components/act/ActButton'
import ActDialog from '@/components/act/ActDialog'
import Space from '@/components/global/Space';

import ActDecorateContainerAsync from '../ActClient/ActDecorateContainerAsync'

const ActButtonDialog = () => {
  const t = useTranslations()

  return (
    <ActDialog
      trigger={
        <ActButton
          imagePath='/charm-anchor/btn-rule.png'
          buttonText={t('rule')}
          wrapperClassName='absolute top-[522px] right-0'
          className='w-[122px] h-[80px]'
        />
      }
    >
      <ActDecorateContainerAsync containerType="Rules" title={t('rule')}>
        <Space h='h-[20px]' />
        <article className='px-[120px] text-[24px] text-[#370200]'>
          {t('desc')}
        </article>
      </ActDecorateContainerAsync>
    </ActDialog>
  )
}

export default ActButtonDialog
