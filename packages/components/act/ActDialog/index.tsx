'use client'

import React, { useState, type PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge'

import { Dialog, DialogOverlay, DialogPortal, DialogTrigger } from "@/components/ui/dialog"

type Props = {
  trigger: React.ReactNode
  wrapperClassName?: string
}

const ActDialog = ({ trigger, children, wrapperClassName }: PropsWithChildren<Props>) => {

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 触发器 */}
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogPortal>
        {/* 遮罩层 */}
        <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)} />
        {/* 弹窗内容 */}
        <div className={twMerge('w-fit h-fit fixed inset-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50', wrapperClassName)}>
          {children}
        </div>
      </DialogPortal>
    </Dialog>
  )
}

export default ActDialog
