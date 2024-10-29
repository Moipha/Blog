/**
 * 用于将图标字符串转成适合的格式
 *
 * - data:url 不做处理
 * - http地址 不做处理
 * - svg格式 转为data:url
 * - 本地路径 转为data:url
 *
 * @param icon 图标字符串
 * @returns string
 */

export default function iconToUrl(icon: string): string {
  if (!icon) return ''
  if (icon.startsWith('data:image')) return icon
  if (icon.startsWith('http')) return icon
  if (icon.startsWith('<svg')) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(icon)}`
  }
  return icon
}
