/**
 * 格式化时间
 * @param time
 */

export default function format(time: string): string {
  const date = new Date(time)

  // 获取年份、月份、日期、小时和分钟
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 月份从0开始，需要加1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds() // 如果需要秒的话也可以加上

  // 获取星期几，中文表示
  const weekdays = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]
  const weekday = weekdays[date.getDay()]

  // 格式化月份和日期为两位数
  const formattedMonth = month < 10 ? '0' + month : month
  const formattedDay = day < 10 ? '0' + day : day
  const formattedHours = hours < 10 ? '0' + hours : hours
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds

  return `${year}年${formattedMonth}月${formattedDay}日 ${weekday} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
