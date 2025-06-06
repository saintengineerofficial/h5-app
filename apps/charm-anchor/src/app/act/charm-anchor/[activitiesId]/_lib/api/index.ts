import { getBaseApiUrl } from "@/lib/utils"
import request from "@repo/request"

import type { RankingRes } from "./type"

export const ActApi = {
  getRanking() {
    return request.post<RankingRes>(getBaseApiUrl(`/api/web/act/gift/contributor/rankList`))
  },
}
