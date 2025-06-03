import React from 'react'

const Loading = () => {
  return (
    <div className="relative w-12 h-12 mx-auto">
      <div className="absolute w-12 h-[5px] bg-neutral-400 top-[60px] left-0 rounded-full animate-loader-shadow" />
      <div className="absolute w-full h-full bg-blue-600 top-0 left-0 rounded-sm animate-loader-jump" />
    </div>
  )
}

export default Loading