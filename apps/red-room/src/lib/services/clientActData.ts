import { CommonActApi } from "@/services/act/common"

export async function getActBaseConfigClient(activitiesId: number) {
  try {
    const response = await CommonActApi.getActConfig({ activitiesId })
    return response
  } catch (error) {
    console.error("Client-side fallback failed:", error)
    throw error
  }
}
