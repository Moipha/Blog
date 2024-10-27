import Tag from './Tag'

interface Api {
  tag: {
    get: Function
    create: Function
    update: Function
    delete: Function
  }
}

const api: Api = {
  tag: Tag
}

export default api
