import queryString from "query-string"
interface CommonApiRes<T> {
  code: number
  msg: string
  res: T
}
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

let globalExtraHeaders: Record<string, string> = {}
export function setGlobalRequestHeaders(headers: Record<string, string>) {
  globalExtraHeaders = headers
}
class Request {
  // constructor() {
  //   // 在客户端环境下动态导入
  //   if (isWindow) {
  //     import("@yg/app-bridge").then(module => {
  //       appBridge = module.default
  //     })
  //   }
  // }

  interceptorsRequest<T>({ url, method, params, extraParams }: Props<T>) {
    let queryParams = ""
    let requestPayload = ""

    const { needUserInfo = true } = extraParams || {}

    const isAppEnv = !!appBridge?.isAppEnv()

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    const defaultHeaders = {
      "X-Uid": 999,
      "X-Authorization": 999,
      "X-AppTag": "Boli",
      "X-RequestSource": isAppEnv ? "web" : "h5",
      "X-Fromurl": "none",
      "X-Language": "zh",
      "X-Frompackage": "none",
    }

    Object.assign(headers, defaultHeaders, globalExtraHeaders)

    // if (needUserInfo && isWindow && isAppEnv) {
    //   const appHeaders = appBridge.getRequestHeaders()
    //   Object.assign(headers, appHeaders)
    // }

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
        const resJsonPromise: Promise<CommonApiRes<T>> = res.json()
        resJsonPromise
          .then(data => {
            if (typeof data === "object" && data !== null && "code" in data && data.code !== 0) {
              return reject({ message: data.msg || "接口错误", code: data.code, url: requestUrl, data })
            }
            return resolve(resJsonPromise as Promise<T>)
          })
          .catch(err => {
            return reject({ message: err?.message || "解析响应失败", url: requestUrl })
          })
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
