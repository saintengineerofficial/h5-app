import React, { type PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='w-screen min-h-screen h-full mx-auto overflow-x-hidden'>{children}</div>
  )
}

export default Layout