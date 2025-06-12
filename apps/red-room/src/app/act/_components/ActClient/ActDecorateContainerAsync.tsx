"use client";

import dynamic from 'next/dynamic';

const ActDecorateContainerAsync = dynamic(() => import('../ActDecorateContainer'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
})

export default ActDecorateContainerAsync;