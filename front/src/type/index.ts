export interface Res {
  data: any
  msg: string
  code: number
}

type TagType = 'blog' | 'code' | 'general'

export interface Tag {
  _id: string
  name: string
  type: TagType
  icon?: string
  createdTime: Date
  updatedTime: Date
}

export interface Blog {
  _id: string
  title: string
  author: string
  content: string
  enable: boolean
  tags: Tag[]
  createdTime: Date
  updatedTime: Date
}
