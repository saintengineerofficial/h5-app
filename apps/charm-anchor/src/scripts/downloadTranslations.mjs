import fs from "fs"
import path from "path"

async function downloadTranslations(id) {
  try {
    const response = await fetch(`https://web.boli.live/lang_conf/pre/h5_${id}.json?__t=${Date.now()}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        Accept: "*/*",
      },
    })
    const translations = await response.json()

    const messagesDir = path.join(process.cwd(), "messages", id)
    // 如果文件夹存在，先删除
    if (fs.existsSync(messagesDir)) {
      fs.rmSync(messagesDir, { recursive: true, force: true })
      console.log(`🗑️ Removed existing translations for ID: ${id}`)
    }
    // 创建新的文件夹
    fs.mkdirSync(messagesDir, { recursive: true })

    Object.entries(translations).forEach(([locale, messages]) => {
      const filePath = path.join(messagesDir, `${locale}.json`)
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2))
      console.log(`✅ Successfully downloaded translations for ${locale} (ID: ${id})`)
    })
  } catch (error) {
    console.error(`❌ Error downloading translations for ID ${id}:`, error)
  }
}

const id = process.argv[2]
if (!id) {
  console.error("Please provide an ID")
  process.exit(1)
}

downloadTranslations(id)
