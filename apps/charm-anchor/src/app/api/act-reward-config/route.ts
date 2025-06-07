import { ACTIVITIES_ID } from "@/constants/app"
import { getConfigBaseApiUrl } from "@/lib/utils"

// 跨域原因转接接口,获取活动奖励配置
export async function GET(request: Request) {
  try {
    const response = await fetch(getConfigBaseApiUrl(`/activity_gift_config_v3/pre/h5_${ACTIVITIES_ID}_ALL.json?__t__=${Date.now()}`))

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
