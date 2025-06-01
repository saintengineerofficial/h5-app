import fs from "fs"
import { tmpdir } from "os"
import path from "path"

import sharp from "sharp"

const inputDir = path.join(process.cwd(), "public")
const supportedExts = [".jpg", ".jpeg", ".png", ".webp"]

// 格式化文件大小显示
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B"
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
  else return (bytes / (1024 * 1024)).toFixed(2) + " MB"
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const tempFilePath = path.join(tmpdir(), `temp-${Date.now()}${ext}`)

  try {
    // 获取原始文件大小
    const originalSize = fs.statSync(filePath).size

    let image = sharp(filePath).resize({ width: 1600, withoutEnlargement: true })
    if (ext === ".jpg" || ext === ".jpeg") {
      image = image.jpeg({ quality: 75 })
    } else if (ext === ".png") {
      image = image.png({ compressionLevel: 8 })
    } else if (ext === ".webp") {
      image = image.webp({ quality: 75 })
    }

    await image.toFile(tempFilePath)

    // 获取压缩后文件大小
    const compressedSize = fs.statSync(tempFilePath).size
    const savings = originalSize - compressedSize
    const savingsPercent = ((savings / originalSize) * 100).toFixed(2)

    fs.renameSync(tempFilePath, filePath) // 使用临时文件替换原文件
    console.log(
      `✅ ${path.basename(filePath)} - ` +
        `原始: ${formatFileSize(originalSize)} → ` +
        `压缩后: ${formatFileSize(compressedSize)} ` +
        `(减少: ${formatFileSize(savings)}, ${savingsPercent}%)`
    )
  } catch (err) {
    console.error(`❌ 失敗: ${filePath}`, err)
  }
}

async function findAndCompressImages(dir) {
  const items = fs.readdirSync(dir)
  for (const item of items) {
    const itemPath = path.join(dir, item)
    const stats = fs.statSync(itemPath)

    if (stats.isDirectory()) {
      await findAndCompressImages(itemPath)
    } else if (stats.isFile() && supportedExts.includes(path.extname(item).toLowerCase())) {
      await compressImage(itemPath)
    }
  }
}

async function compressAllImages() {
  console.log("🔍 开始压缩图片...")
  let startTime = Date.now()
  await findAndCompressImages(inputDir)
  let endTime = Date.now()
  console.log(`✨ 压缩完成，耗时 ${((endTime - startTime) / 1000).toFixed(2)} 秒`)
}

compressAllImages()
