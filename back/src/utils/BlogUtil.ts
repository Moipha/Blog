import type { BlogVO, IBlog, ITag } from '../types'
import TagService from '../services/TagService'

export async function iToVO(blog: IBlog): Promise<BlogVO> {
  const res = {
    title: blog.title,
    author: blog.author,
    content: blog.content,
    enable: blog.enable,
    createdTime: blog.createdTime,
    updatedTime: blog.updatedTime,
    tags: [] as ITag[],
    _id: blog._id as string
  }
  // 获取标签对象
  for (const item of blog.tags) {
    const tag: ITag = await TagService.getById(item)
    res.tags.push(tag)
  }
  return res
}
