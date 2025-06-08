import getConfig from "next/config"

export const ACTIVITIES_ID = 378
export const TRANSLATE_ID = 544

const { publicRuntimeConfig } = getConfig()
export const basePath = publicRuntimeConfig?.basePath || "/charm-anchor"
