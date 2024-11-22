import { Schema, model } from 'mongoose'
import type { IBlog } from '../types'

/**
 * 博客模型
 */

// 创建文档结构
const BlogSchema = new Schema({
  title: { type: String, required: true }, // 博客题目
  author: { type: String, required: true }, // 作者
  tags: { type: Array, required: true }, // 标签
  content: { type: String, required: true }, // 文章内容
  enable: { type: Boolean, default: true }, // 可见状态
  desc: { type: String, default: '' }, // 描述
  createdTime: { type: Date, default: () => Date.now() },
  updatedTime: { type: Date, default: () => Date.now() },
  cover: { type: String } // 封面
})

// 创建文档模型
const Blog = model<IBlog>('blog', BlogSchema)
export default Blog
