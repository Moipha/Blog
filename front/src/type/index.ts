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
