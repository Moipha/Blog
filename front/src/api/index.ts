import Tag from './Tag'
import Blog from './Blog'

interface Api {
  tag: {
    get: Function
    create: Function
    update: Function
    delete: Function
    getAll: Function
  }
  blog: {
    get: Function
    create: Function
    update: Function
    delete: Function
    getById: Function
  }
}

const api: Api = {
  tag: Tag,
  blog: Blog
}

export default api
