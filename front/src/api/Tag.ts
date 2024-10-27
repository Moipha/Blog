import { Tag } from '@/type'
import request from '@/utils/request'

class TagApi {
  async get(
    condition: { type: string; name: string },
    callback: Function,
    errorCallback: Function
  ) {
    try {
      const res = await request.get('/tag', { params: condition })
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
      const res = await request.post('/tag', data)
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
      const res = await request.put('/tag', data)
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
      const res = await request.delete('/tag', { params: { id: data } })
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
