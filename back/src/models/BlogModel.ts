import { Schema, model } from 'mongoose'

/**
 * 博客模型
 */

// 创建文档结构
const BlogSchema = new Schema({
  title: { type: String, required: true }, // 博客题目
  tags: { type: Array, required: false }, // 标签
  icon: { type: String, required: false }, // 标签图标
  content: { type: String, required: true }, // 文章内容
  createdTime: { type: Date, default: () => Date.now() },
  updatedTime: { type: Date, default: () => Date.now() }
})

// 创建文档模型
const Blog = model('tag', BlogSchema)
export default Blog
