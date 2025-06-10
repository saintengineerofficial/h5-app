import { getBaseApiUrl, getConfigBaseApiUrl } from "@/lib/utils"

import type { ActConfigParams, ActConfigRes, RewardConfigV3Res, ServerTimeRes, TranslationsParams, TranslationsRes } from "./type"
import type { CommonApiRes } from "@/services/type"
import request from "@repo/request"
import { ACTIVITIES_ID, ACTNAME } from "@/constants/app"

export const CommonActApi = {
  getActConfig(params: ActConfigParams) {
    return request.post<CommonApiRes<ActConfigRes>, ActConfigParams>(getBaseApiUrl("/api/web/activities_config/act"), params)
  },
  getActRewardConfig() {
    return request.get<RewardConfigV3Res>(
      getConfigBaseApiUrl(`/activity_gift_config_v3/pre/h5_${ACTIVITIES_ID}_ALL.json?__t__=${Date.now()}`),
      { cacheTime: 1000 * 60 * 60 * 24 },
      { needUserInfo: false }
    )
  },
  getActRewardConfigProxy() {
    return request.get<RewardConfigV3Res>(`/${ACTNAME}/api/act-reward-config`, { cacheTime: 1000 * 60 * 60 * 24 }, { needUserInfo: false })
  },
  getTranslations(params: TranslationsParams) {
    return request.get<TranslationsRes>(
      getConfigBaseApiUrl(`/lang_conf/pre/h5_${params.translateId}.json?__t__=${Date.now()}`),
      { cacheTime: 1000 * 60 * 60 * 24 },
      { needUserInfo: false }
    )
  },
  getServerTime() {
    return request.get<ServerTimeRes>(getBaseApiUrl("/api/web/ServerTimeArg"))
  },
}
