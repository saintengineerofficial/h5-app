import { getConfigBaseApiUrl } from "@/lib/utils"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const activitiesId = searchParams.get("activitiesId")

    if (!activitiesId) {
      return Response.json({ error: "Missing activitiesId" }, { status: 400 })
    }

    const response = await fetch(getConfigBaseApiUrl(`/activity_gift_config_v3/pre/h5_${activitiesId}_ALL.json?__t__=${Date.now()}`))

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, max-age=600", // 缓存5分钟
      },
    })
  } catch (error) {
    console.error("Proxy error:", error)
    return Response.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
