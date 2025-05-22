export interface CommonApiRes<T> {
  code: number
  msg: string
  res: T
}

export type LangKey = "zh" | "en" | "ar"
