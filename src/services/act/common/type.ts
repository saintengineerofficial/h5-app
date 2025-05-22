import { LangKey } from "@/services/type"

import type { DisplayStyle } from "./constant"

export interface ActConfigParams {
  activitiesId: number
}

export interface ActConfigRes {
  id: number
  subActivitiesTypes: string
  startTime: number
  endTime: number
  isPartition: boolean
  isNationalDay: boolean
  userRegion: string
  regionList: string[]
  giftInfoList: any
  extConfig: string
  isWhite: boolean
}

export interface TranslationsParams {
  translateId: number
}

export type TranslationsRes = {
  [key in LangKey]: Record<string, string>
}

export interface RewardConfigV3Res {
  userSendGiftRank?: RewardConfigV3ResUserConfig
  userReceiveGiftRank?: RewardConfigV3ResUserConfig
  userRechargeRank?: RewardConfigV3ResUserConfig
  ordinaryRoomRank?: RewardConfigV3ResRoomConfig
}

export type RewardConfigV3ResType = keyof RewardConfigV3Res

export interface RewardConfigV3ResUserConfig {
  userConfig: ActivitiesReward[]
}
export interface RewardConfigV3ResRoomConfig {
  roomConfig: ActivitiesReward[]
}

export interface ActivitiesReward {
  id: number
  name: string
  sort: number
  displayStyle: DisplayStyle
  nameI18n: LangKey
  activityGiftConfigGroupGiftList: RewardGift[]
  displayStyleExtJson?: string
}

export interface RewardGift {
  id: number
  name: string
  expireType: number
  cover: string
  sort: number
  nameI18n: LangKey
}

export interface ExtConfig {
  web: WebConfig
  templateConfig: TemplateConfig
}

export interface WebConfig {
  pageConfig: PageConfig
  activityUrl: string
}

export interface PageConfig {
  translateId: number
}

export interface TemplateConfig {
  templateProject: string
  templateType: string
  templateName: string
  templateTheme: string
  mergeRankActivityType: boolean
  mergeTaskActivityType: boolean
  rank: TemplateConfigRank
  dataConfig: DataConfig
  themeConfig: ThemeConfig
}

export interface TemplateConfigRank {
  userRechargeHiddenScore: boolean
}

export interface DataConfig {
  banner: DataConfigBanner
  task: DataConfigTask
}

export interface DataConfigBanner {
  cover: string
  title: DataConfigBannerTitle
  webp: string
}

export interface DataConfigBannerTitle {
  AR: string
  EN: string
  TR: string
  ES: string
}

export interface DataConfigTask {
  scoreIntroImage: string
  scoreIcon: string
}

export interface ThemeConfig {
  body: ThemeConfigBody
  task: ThemeConfigTask
}

export interface ThemeConfigBody {
  background: string
  mainColor: string
}

export interface ThemeConfigTask {
  dailyTaskItemBg: string
  stepsTaskItemProgressBg: string
}

export interface ServerTimeRes {
  weekstart: string
  weekend: string
  remaintime214: number
  weekstartts: number
  today: number
  yestoday: number
  thismonth: number
  lastmonth: number
  now: number
  friday: number
  weekendts: number
  weekendts2: number
  weekendts3: number
  weekendts4: number
  weekendts5: number
  weekendts6: number
  weekendts7: number
}
