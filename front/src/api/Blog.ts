import { Blog } from '@/type'
import request from '@/utils/request'

const baseURL = '/blog'

class BlogApi {
  async get(
    condition: {
      tags: string[]
      title: string
      pageNum: number
      pageSize: number
    },
    callback: Function,
    errorCallback: Function
  ) {
    try {
      const res = await request.get(baseURL, { params: condition })
      if (res.data.code === 200) {
        callback(res.data)
      } else {
        errorCallback({ message: res.data.msg })
      }
    } catch (e) {
      errorCallback(e)
    }
  }
  async create(
    data: { title: string; author: string; content: string; tags: string[] },
    callback: Function,
    errorCallback: Function
  ) {
    try {
      const res = await request.post(baseURL, data)
      if (res.data.code === 200) {
        callback(res.data)
      } else {
        errorCallback({ message: res.data.msg })
      }
    } catch (e) {
      errorCallback(e)
    }
  }
  async update(data: Blog, callback: Function, errorCallback: Function) {
    try {
      const res = await request.put(baseURL, data)
      if (res.data.code === 200) {
        callback(res.data)
      } else {
        errorCallback({ message: res.data.msg })
      }
    } catch (e) {
      errorCallback(e)
    }
  }
  async delete(data: string, callback: Function, errorCallback: Function) {
    try {
      const res = await request.delete(baseURL, { params: { id: data } })
      if (res.data.code === 200) {
        callback(res.data)
      } else {
        errorCallback({ message: res.data.msg })
      }
    } catch (e) {
      errorCallback(e)
    }
  }
}

export default new BlogApi()
