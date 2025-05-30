import { isNumber } from "./type-util"

export enum ScoreUnit {
  default = "",
  k = "K",
  m = "M",
}

export enum ScoreUnitAr {
  default = "",
  k = "ألف",
  m = "مليون",
}

export const px2vw = (px: number | string | undefined, viewportWidth = 750): string => {
  if (isNumber(px)) return `${pxToVw(Number(px), viewportWidth)}vw`
  if (!String(px).includes("px")) return px as string
  const val = Number(String(px).replace("px", ""))
  return `${pxToVw(val, viewportWidth)}vw`
}

export const pxToVw = (px: number, viewportWidth = 750): number => {
  return Number(((px / viewportWidth) * 100).toFixed(3)) // 保留3位小数，和 postcss 配置对齐
}

export const getCssBackgroundImage = (backgroundImage: string) => {
  return `url(${backgroundImage})`
}

export const str2Json = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr || "{}")
  } catch (error) {
    console.log("str2Json", error)
  }
  return {}
}

export const getCssWHNumber = (type: "w" | "h", className: string) => {
  const match = className.match(new RegExp(`${type}-\\[(\\d+)px\\]`))
  return match ? Number(match[1]) : 0
}

export const isArLang = (lang?: string) => {
  return (lang || "").includes("ar")
}

export const numberToScore = function (num: number, lang?: string): string | number {
  let score: number | string = parseInt(String(num || 0))
  if (score >= 1000000) {
    score = `${parseInt(String(score / 100000)) / 10}${isArLang(lang) ? ScoreUnitAr.m : ScoreUnit.m}`
  } else if (score > 1000) {
    score = `${parseInt(String(score / 100)) / 10}${isArLang(lang) ? ScoreUnitAr.k : ScoreUnit.k}`
  }
  return score
}
