type TagType = 'blog' | 'code' | 'general'

export interface ITag {
  name: string
  type: TagType
  icon?: string
  createdTime: Date
  updatedTime: Date
}

export interface TagDTO {
  name: string
  type: TagType
  color?: string
  icon?: string
}
