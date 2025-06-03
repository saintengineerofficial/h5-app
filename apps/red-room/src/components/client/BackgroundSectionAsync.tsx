"use client";

import dynamic from 'next/dynamic';

const BackgroundSectionAsync = dynamic(() => import('@/components/global/BackgroundSection'), {
  ssr: false,
})

export default BackgroundSectionAsync;