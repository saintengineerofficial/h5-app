import queryString from "query-string"

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

type ParamsWithCache<T> = T & { cacheTime?: number }

interface Props<T = any> {
  url: string
  method: Method
  params?: ParamsWithCache<T>
}

type Config = { next: { revalidate: number } } | { cache: "no-store" } | { cache: "force-cache" }

class Request {
  interceptorsRequest<T>({ url, method, params }: Props<T>) {
    let queryParams = ""
    let requestPayload = ""

    const headers = {}

    const { cacheTime, ...realParams } = params || {}

    const config: Config =
      cacheTime || cacheTime === 0 ? (cacheTime > 0 ? { next: { revalidate: cacheTime } } : { cache: "no-store" }) : { cache: "force-cache" }

    if (method === "GET" || method === "DELETE") {
      if (realParams) {
        queryParams = queryString.stringify(realParams)
        url = `${url}?${queryParams}`
      }
    } else {
      if (!["[object FormData]", "[object URLSearchParams]"].includes(Object.prototype.toString.call(realParams))) {
        Object.assign(headers, { "Content-Type": "application/json" })
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

  async httpFactory<T, P = any>({ url = "", method, params }: Props<P>): Promise<T> {
    const req = this.interceptorsRequest({
      url,
      method,
      params,
    })
    const res = await fetch(req.url, req.options)
    return this.interceptorsResponse<T>(res)
  }

  async request<T, P = any>(method: Method, url: string, params?: ParamsWithCache<P>): Promise<T> {
    return this.httpFactory<T, P>({ url, method, params })
  }

  get<T, P = any>(url: string, params?: ParamsWithCache<P>): Promise<T> {
    return this.request("GET", url, params)
  }

  post<T, P = any>(url: string, params?: ParamsWithCache<P>): Promise<T> {
    return this.request("POST", url, params)
  }

  put<T, P = any>(url: string, params?: ParamsWithCache<P>): Promise<T> {
    return this.request("PUT", url, params)
  }

  delete<T, P = any>(url: string, params?: ParamsWithCache<P>): Promise<T> {
    return this.request("DELETE", url, params)
  }

  patch<T, P = any>(url: string, params?: ParamsWithCache<P>): Promise<T> {
    return this.request("PATCH", url, params)
  }
}

const request = new Request()

export default request
