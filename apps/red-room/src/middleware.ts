import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const fromPackage = "none"
  const language = request.headers.get("accept-language")?.slice(0, 2) || "zh"
  const fromUrl = request.nextUrl.href

  const response = NextResponse.next()

  // 只在没 cookie 时设置，避免重复
  if (!request.cookies.get("x-frompackage")) {
    response.cookies.set("x-frompackage", fromPackage)
  }
  if (!request.cookies.get("x-language")) {
    response.cookies.set("x-language", language)
  }
  if (!request.cookies.get("x-fromUrl")) {
    response.cookies.set("x-fromUrl", fromUrl)
  }

  return response
}
