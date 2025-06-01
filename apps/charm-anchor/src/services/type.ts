export interface CommonApiRes<T> {
  code: number
  msg: string
  res: T
}

export type LangKey = "zh" | "en" | "ar"
export type Region = "ZH" | "EN" | "AR"

// 获取用户信息
export interface UserInfoRes {
  avatarUrl: string
  countryId: number
  duid: number
  familyRegion: Region
  gender: number
  isCustomer: boolean
  nickname: string
  region: Region
  uid: number
}
