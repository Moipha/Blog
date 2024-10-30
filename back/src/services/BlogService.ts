import BlogModel from '../models/BlogModel.ts'
import type { BlogDTO, BlogVO, IBlog } from '../types/index.ts'

class BlogService {
  // 新建博客
  async add(body: BlogDTO): Promise<IBlog> {
    const blog = await BlogModel.create(body)
    return blog
  }

  // 获取标签列表
  async list(query: {
    tags: [] | undefined
    title: string
    pageSize: number
    pageNum: number
  }): Promise<[IBlog[], number]> {
    // 分页查询
    const blogs = await BlogModel.find({
      tags: query.tags ? { $in: query.tags } : { $exists: true },
      title: { $regex: query.title, $options: 'i' }
    })
      .skip((query.pageNum - 1) * query.pageSize)
      .limit(query.pageSize)
      .sort({ createdTime: -1 })
    // 获取总数
    const total = await BlogModel.countDocuments({
      tags: query.tags ? { $in: query.tags } : { $exists: true },
      title: { $regex: query.title, $options: 'i' }
    })
    return [blogs, total]
  }
  // 更新博客
  async update(body: any): Promise<void> {
    await BlogModel.updateOne(
      { _id: body._id },
      { $set: { ...body, updatedTime: new Date() } }
    )
  }
  // 删除博客
  async delete(id: string): Promise<void> {
    await BlogModel.deleteOne({ _id: id })
  }
}

export default new BlogService()
