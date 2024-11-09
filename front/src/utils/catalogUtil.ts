import { visit } from 'unist-util-visit'
import { getProcessor } from 'bytemd'

// 生成目录
export function generateCatalog(text: string): {
  minLevel: number
  catalog: { text: string; level: number }[]
} {
  // 节点列表
  const items = []
  // 最小标题级别
  let minLevel = 6
  // 生成的目录列表
  let catalog: { text: string; level: number }[] = []
  getProcessor({
    plugins: [
      {
        rehype: (p) =>
          p.use(() => (tree: { children: any[] }) => {
            if (tree && tree.children.length) {
              tree.children
                .filter((v) => v.type === 'element')
                .forEach((node) => {
                  if (node.tagName[0] === 'h' && !!node.children.length) {
                    const i = Number(node.tagName[1])
                    minLevel = Math.min(minLevel, i)
                    items.push({
                      level: i,
                      text: stringifyHeading(node)
                    })
                  }
                })
              catalog = items.filter((v) => v.level === 1 || v.level === 2 || v.level === 3)
            }
          })
      }
    ]
  }).processSync(text)

  return {
    minLevel,
    catalog
  }
}

// 文本转换
function stringifyHeading(e) {
  let result = ''
  visit(e, (node) => {
    if (node.type === 'text') {
      result += node.value
    }
  })
  return result
}
