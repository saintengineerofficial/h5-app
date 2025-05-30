import queryString from "query-string"

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

type ParamsWithCache<T> = T & { cacheTime?: number }
type ExtraParams = {
  needUserInfo?: boolean
}
interface Props<T = any> {
  url: string
  method: Method
  params?: ParamsWithCache<T>
  extraParams?: ExtraParams
}

type Config = { next: { revalidate: number } } | { cache: "no-store" } | { cache: "force-cache" }

let appBridge: any = null
const isWindow = typeof window !== "undefined"

class Request {
  // private userInfo: UserInfoRes = defaultUserInfo
  // private userInfoPromise: Promise<UserInfoRes> | null = null
  // private lastFetchTime: number = 0
  // private readonly CACHE_DURATION = 30 * 60 * 1000 // 30分钟缓存

  constructor() {
    // 在客户端环境下动态导入
    if (isWindow) {
      import("@yg/app-bridge").then(module => {
        appBridge = module.default
      })
    }
  }

  // private async fetchUserInfo() {
  //   try {
  //     const response = await fetch(getBaseApiUrl("/api/web/user/info"), { method: "POST" })
  //     const data = await response.json()
  //     this.userInfo = data
  //     this.lastFetchTime = Date.now()
  //     return data
  //   } catch (error) {
  //     console.error("Failed to fetch user info:", error)
  //     return defaultUserInfo
  //   }
  // }

  // private async getUserInfo() {
  //   const now = Date.now()

  //   // 检查缓存是否有效
  //   if (this.userInfo && now - this.lastFetchTime < this.CACHE_DURATION) {
  //     return this.userInfo
  //   }

  //   // 如果正在获取，返回正在进行的请求
  //   if (this.userInfoPromise) {
  //     return this.userInfoPromise
  //   }

  //   // 创建新的请求
  //   this.userInfoPromise = this.fetchUserInfo().finally(() => {
  //     this.userInfoPromise = null
  //   })

  //   return this.userInfoPromise
  // }

  interceptorsRequest<T>({ url, method, params, extraParams }: Props<T>) {
    let queryParams = ""
    let requestPayload = ""

    const { needUserInfo = true } = extraParams || {}

    const isAppEnv = !!appBridge?.isAppEnv()

    const headers = {
      "Content-Type": "application/json",
    }

    const defaultHeaders = {
      "X-Uid": 999,
      "X-Authorization": 999,
      "X-AppTag": "Boli",
      "X-RequestSource": isAppEnv ? "web" : "h5",
    }

    Object.assign(headers, defaultHeaders)

    if (needUserInfo && isWindow && isAppEnv) {
      const appHeaders = appBridge.getRequestHeaders()
      Object.assign(headers, appHeaders)
    }

    const { cacheTime, ...realParams } = params || {}

    const config: Config =
      cacheTime || cacheTime === 0 ? (cacheTime > 0 ? { next: { revalidate: cacheTime } } : { cache: "no-store" }) : { cache: "force-cache" }

    if (method === "GET" || method === "DELETE") {
      if (realParams) {
        queryParams = queryString.stringify(realParams)
        url = `${url}?${queryParams}`
      }
    } else {
      const objectType = Object.prototype.toString.call(realParams)
      if (!["[object FormData]", "[object URLSearchParams]"].includes(objectType)) {
        requestPayload = JSON.stringify(realParams)
      }
    }

    return {
      url,
      options: {
        method,
        headers,
        body: method !== "GET" && method !== "DELETE" ? requestPayload : undefined,
        ...config,
      },
    }
  }

  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestUrl = res.url
      if (res.ok) {
        return resolve(res.json() as Promise<T>)
      } else {
        res
          .clone()
          .text()
          .then(text => {
            try {
              const errorData = JSON.parse(text)
              return reject({ message: errorData || "接口错误", url: requestUrl })
            } catch {
              return reject({ message: text, url: requestUrl })
            }
          })
      }
    })
  }

  async httpFactory<T, P = any>({ url = "", method, params, extraParams }: Props<P>): Promise<T> {
    const req = this.interceptorsRequest({
      url,
      method,
      params,
      extraParams,
    })
    const res = await fetch(req.url, req.options)
    return this.interceptorsResponse<T>(res)
  }

  async request<T, P = any>(method: Method, url: string, params?: ParamsWithCache<P>, extraParams?: ExtraParams): Promise<T> {
    return this.httpFactory<T, P>({ url, method, params, extraParams })
  }

  get<T, P = any>(url: string, params?: ParamsWithCache<P>, extraParams?: ExtraParams): Promise<T> {
    return this.request("GET", url, params, extraParams)
  }

  post<T, P = any>(url: string, params?: ParamsWithCache<P>, extraParams?: ExtraParams): Promise<T> {
    return this.request("POST", url, params, extraParams)
  }

  put<T, P = any>(url: string, params?: ParamsWithCache<P>, extraParams?: ExtraParams): Promise<T> {
    return this.request("PUT", url, params, extraParams)
  }

  delete<T, P = any>(url: string, params?: ParamsWithCache<P>, extraParams?: ExtraParams): Promise<T> {
    return this.request("DELETE", url, params, extraParams)
  }

  patch<T, P = any>(url: string, params?: ParamsWithCache<P>, extraParams?: ExtraParams): Promise<T> {
    return this.request("PATCH", url, params, extraParams)
  }
}

const request = new Request()

export default request
