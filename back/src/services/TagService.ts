import TagModel from '../models/TagModel.ts'
import type { TagDTO, ITag } from '../types/index.ts'
class TagService {
  // 新建标签
  async add(body: TagDTO): Promise<ITag> {
    const tag = await TagModel.create(body)
    console.log(tag)
    return tag
  }

  // 获取标签列表
  async list(query: { type: string; name: string }): Promise<ITag[]> {
    const tags = await TagModel.find({
      type: query.type === '' ? { $exists: true } : query.type,
      name: { $regex: query.name, $options: 'i' }
    })
    return tags
  }
  async update(body: any): Promise<void> {
    await TagModel.updateOne(
      { _id: body._id },
      { $set: { ...body, updatedTime: new Date() } }
    )
  }

  async delete(id: string): Promise<void> {
    await TagModel.deleteOne({ _id: id })
  }
}

export default new TagService()
