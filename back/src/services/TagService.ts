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
  async list(): Promise<ITag[]> {
    const tags = await TagModel.find()
    return tags
  }
}

export default new TagService()
