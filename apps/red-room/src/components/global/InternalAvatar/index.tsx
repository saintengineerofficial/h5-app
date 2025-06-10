'use client'
import React from 'react'

import appBridge from '@yg/app-bridge'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  src: string
  className?: string
  uid?: number
}

const InternalAvatar = ({ src, className, uid }: Props) => {

  const handleClick = () => {
    if (uid) {
      appBridge.gotoUser(uid);
      return
    }
  }

  return (
    <Avatar className={className} onClick={handleClick}>
      <AvatarImage src={src} className='size-full rounded-[inherit] object-cover' />
      <AvatarFallback>Boli</AvatarFallback>
    </Avatar>
  )
}

export default InternalAvatar