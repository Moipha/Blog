import { Document } from 'mongoose'

type TagType = 'blog' | 'code' | 'general'

/**
 * 标签
 */
export interface ITag extends Document {
  name: string
  type: TagType
  icon?: string
  createdTime: Date
  updatedTime: Date
}
export interface TagDTO {
  name: string
  type: TagType
  icon?: string
}

/**
 * 博客
 */
export interface IBlog extends Document {
  title: string
  author: string
  tags: string[]
  content: string
  enable: boolean
  desc: string
  createdTime: Date
  updatedTime: Date
}

export interface BlogDTO {
  title: string
  author: string
  tags: string[]
  content: string
  desc: string
}

export interface BlogVO {
  _id: string
  title: string
  author: string
  tags: ITag[]
  content: string
  enable: boolean
  desc: string
  createdTime: Date
  updatedTime: Date
}
