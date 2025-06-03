import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseApiUrl(path: string) {
  return process.env.NEXT_PUBLIC_BASEURL + path
}

export function getConfigBaseApiUrl(path: string) {
  return process.env.NEXT_PUBLIC_CONFIG_BASEURL + path
}

export function generateImport(path: string): string {
  // 提取文件名（不带扩展名）作为变量名
  const parts = path.split("/")
  const fileName = parts[parts.length - 1]
  const variableName = fileName
    .replace(/\.[^/.]+$/, "") // 去掉扩展名
    .replace(/[-\s](\w)/g, (_, c) => c.toUpperCase()) // 转驼峰
    .replace(/^\w/, c => c.toLowerCase()) // 首字母小写

  console.log(`import ${variableName} from '${path}';`)
  return `import ${variableName} from '${path}';`
}
