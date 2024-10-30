import TagModel from '../models/TagModel.ts'
import type { TagDTO, ITag } from '../types/index.ts'
class TagService {
  // 新建标签
  async add(body: TagDTO): Promise<ITag> {
    console.log(body)
    const tag = await TagModel.create(body)
    console.log(tag)
    return tag
  }

  // 获取标签列表
  async list(query: {
    type: string
    name: string
    pageSize: number
    pageNum: number
  }): Promise<[ITag[], number]> {
    // 分页查询
    const tags = await TagModel.find({
      type: query.type === '' ? { $exists: true } : query.type,
      name: { $regex: query.name, $options: 'i' }
    })
      .skip((query.pageNum - 1) * query.pageSize)
      .limit(query.pageSize)
      .sort({ createdTime: -1 })
    // 获取总数
    const total = await TagModel.countDocuments({
      type: query.type === '' ? { $exists: true } : query.type,
      name: { $regex: query.name, $options: 'i' }
    })
    return [tags, total]
  }
  // 更新标签
  async update(body: any): Promise<void> {
    await TagModel.updateOne(
      { _id: body._id },
      { $set: { ...body, updatedTime: new Date() } }
    )
  }
  // 删除标签
  async delete(id: string): Promise<void> {
    await TagModel.deleteOne({ _id: id })
  }

  // 获取指定id的标签
  async getById(id: string): Promise<ITag> {
    const tag = await TagModel.findOne({ _id: id })
    return tag
  }
}

export default new TagService()
