import "server-only"
import { CommonActApi } from "@/services/act/common"

export async function getActBaseConfig(activitiesId: number) {
  const response = await CommonActApi.getActConfig({ activitiesId })
  return response
}
