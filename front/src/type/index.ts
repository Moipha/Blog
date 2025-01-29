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
  createdTime: string
  updatedTime: string
}

export interface Blog {
  _id: string
  title: string
  author: string
  content: string
  enable: boolean
  tags: Tag[]
  desc: string
  createdTime: string
  updatedTime: string
  cover: string
  viewCount: number
  likeCount: number
}

export interface BlogDTO {
  _id?: string
  title: string
  author: string
  content: string
  enable: boolean
  tags: string[]
  desc: string
  cover: string
}
