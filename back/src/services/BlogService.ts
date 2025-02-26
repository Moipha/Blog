import BlogModel from '../models/BlogModel.ts'
import type { BlogDTO, BlogVO, IBlog } from '../types/index.ts'
import { iToVO } from '../utils/BlogUtil.ts'
import tagService from '../services/TagService.ts'

class BlogService {
  // 新建博客
  async add(body: BlogDTO): Promise<IBlog> {
    const blog = await BlogModel.create(body)
    return blog
  }

  // 获取博客列表
  async list(query: {
    tags: [] | undefined
    title: string
    pageSize: number
    pageNum: number
    enable: boolean | undefined
  }): Promise<[BlogVO[], number]> {
    // 分页查询
    const blogs = await BlogModel.find({
      tags: query.tags ? { $in: query.tags } : { $exists: true },
      enable: query.enable !== undefined ? { $eq: query.enable } : { $exists: true },
      title: { $regex: query.title, $options: 'i' }
    })
      .skip((query.pageNum - 1) * query.pageSize)
      .limit(query.pageSize)
      .sort({ createdTime: -1 })
    // 获取总数
    const total = await BlogModel.countDocuments({
      tags: query.tags ? { $in: query.tags } : { $exists: true },
      enable: query.enable !== undefined ? { $eq: query.enable } : { $exists: true },
      title: { $regex: query.title, $options: 'i' }
    })
    const res = await iToVO(blogs)
    return [res, total]
  }
  // 更新博客
  async update(body: any): Promise<void> {
    const { _id, tags: newTags } = body
    // 获取旧文章的标签列表
    const oldBlog = await BlogModel.findById(_id)
    const oldTags = oldBlog.tags

    // 比较新旧标签列表
    const addedTags = newTags.filter((tagId: string) => !oldTags.includes(tagId))
    const removedTags = oldTags.filter((tagId: string) => !newTags.includes(tagId))

    // 更新标签引用次数
    await Promise.all([
      ...addedTags.map((tagId: string) => tagService.updateTagTimes(tagId, true)),
      ...removedTags.map((tagId: string) => tagService.updateTagTimes(tagId, false))
    ])

    await BlogModel.updateOne({ _id: body._id }, { $set: { ...body, updatedTime: new Date() } })
  }
  // 删除博客
  async delete(id: string): Promise<void> {
    const blog = await BlogModel.findById(id)
    if (blog.tags && blog.tags.length > 0) {
      await Promise.all(blog.tags.map((tagId: string) => tagService.updateTagTimes(tagId, false)))
    }
    await BlogModel.deleteOne({ _id: id })
  }

  // 根据id获取博客
  async getById(id: string): Promise<BlogVO> {
    const blog = await BlogModel.findById(id)
    const res = (await iToVO([blog]))[0]
    return res
  }

  // 增加浏览量+1
  async addViews(id: string): Promise<void> {
    await BlogModel.updateOne({ _id: id }, { $inc: { viewCount: 1 } })
  }

  // 增减点赞数
  async minusLikes(id: string): Promise<void> {
    await BlogModel.updateOne({ _id: id }, { $inc: { likeCount: -1 } })
  }
  async addLikes(id: string): Promise<void> {
    await BlogModel.updateOne({ _id: id }, { $inc: { likeCount: 1 } })
  }

  // 根据关键词搜索文章，标题、内容、摘要模糊查询
  async search(keyword: string): Promise<BlogVO[]> {
    const blogs = await BlogModel.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } },
        { desc: { $regex: keyword, $options: 'i' } }
      ]
    }).sort({ createdTime: -1 })
    return iToVO(blogs)
  }
}

export default new BlogService()
