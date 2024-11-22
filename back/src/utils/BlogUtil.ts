import type { BlogVO, IBlog, ITag } from '../types'
import TagService from '../services/TagService.ts'

export async function iToVO(blog: IBlog[]): Promise<BlogVO[]> {
  return Promise.all(blog.map((item) => fn(item)))
}

async function fn(blog: IBlog): Promise<BlogVO> {
  const res = {
    title: blog.title,
    author: blog.author,
    content: blog.content,
    enable: blog.enable,
    desc: blog.desc,
    createdTime: blog.createdTime,
    updatedTime: blog.updatedTime,
    tags: [] as ITag[],
    cover: blog.cover,
    _id: blog._id as string
  }
  // 获取标签对象
  for (const item of blog.tags) {
    const tag: ITag = await TagService.getById(item)
    res.tags.push(tag)
  }
  return res
}
