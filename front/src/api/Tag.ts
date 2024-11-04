import { Tag } from '@/type'
import request from '@/utils/request'

const baseURL = '/tag'
class TagApi {
  async get(
    condition: {
      type: string
      name: string
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
    data: { name: string; type: string; icon?: string },
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
  async update(data: Tag, callback: Function, errorCallback: Function) {
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
  async getAll(types: string[], callback: Function, errorCallback: Function) {
    try {
      const res = await request.get(baseURL + '/get-all', { params: { types } })
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

export default new TagApi()
