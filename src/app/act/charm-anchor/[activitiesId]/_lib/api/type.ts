import type { CommonApiRes } from "@/services/type"

export interface RankingItem {
  activelv: number
  avatarurl: string
  countryUrl: string
  duid: number
  gender: number
  gid: number
  identityIconInfo: null
  isMine: boolean
  medalsIcon: []
  nickname: string
  nobility: number
  suid: string
  suidLv: number
  supporters: null
  svip: number
  uid: number
  val: number
  wealthlv: number
}

export type RankingRes = CommonApiRes<RankingItem[]>
