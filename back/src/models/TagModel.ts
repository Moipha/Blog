import { Schema, model } from 'mongoose'
import type { ITag } from '../types'

/**
 * 标签模型
 */

// 创建文档结构
const TagSchema = new Schema({
  name: { type: String, required: true }, // 标签名称
  type: { type: String, enum: ['blog', 'code', 'general'], default: 'general' }, // 标签类型
  icon: { type: String, required: false }, // 标签图标
  createdTime: { type: Date, default: () => Date.now() }, // 创建时间
  updatedTime: { type: Date, default: () => Date.now() } // 更新时间
})

// 创建文档模型
const Tag = model<ITag>('tag', TagSchema)
export default Tag
