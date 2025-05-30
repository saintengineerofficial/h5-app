
import React, { type PropsWithChildren } from 'react'

import DecorateContainer from '@/components/act/DecorateContainer'

import { ActDecorateContainerConfig, ActDecorateContainerType } from './config'


type Props = {
  containerType: ActDecorateContainerType
  title?: string
  isOnlyContent?: boolean
  className?: string
}

const ActDecorateContainer = ({ containerType, children, className, title, isOnlyContent = false }: PropsWithChildren<Props>) => {

  // 如果title存在，则添加titleSection
  const titleSection = {
    title,
    className: ""
  }

  const config = { ...ActDecorateContainerConfig[containerType], titleSection }

  return (
    <DecorateContainer {...config} className={className} isOnlyContent={isOnlyContent}  >
      {children}
    </DecorateContainer>
  )
}

export default ActDecorateContainer