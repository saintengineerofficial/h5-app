import dayjs from "dayjs"

export const formatTimestamp = (timestamp: number, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(timestamp).format(format)
}

export const getTimestamp = (date: string) => {
  return dayjs(date).unix()
}
