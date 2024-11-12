import { Tag } from '@/type'
import request from '@/utils/request'

const baseURL = '/tag'

class TagApi {
  // 统一格式
  private async requestHandler(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    dataOrParams: any,
    callback: Function,
    errorCallback: Function
  ) {
    try {
      const res = await request[method](url, dataOrParams)
      if (res.data.code === 200) {
        callback(res.data)
      } else {
        errorCallback({ message: res.data.msg })
      }
    } catch (e) {
      errorCallback(e)
    }
  }

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
    await this.requestHandler('get', baseURL, { params: condition }, callback, errorCallback)
  }

  async create(
    data: { name: string; type: string; icon?: string },
    callback: Function,
    errorCallback: Function
  ) {
    await this.requestHandler('post', baseURL, data, callback, errorCallback)
  }

  async update(data: Tag, callback: Function, errorCallback: Function) {
    await this.requestHandler('put', baseURL, data, callback, errorCallback)
  }

  async delete(id: string, callback: Function, errorCallback: Function) {
    await this.requestHandler('delete', baseURL, { params: { id } }, callback, errorCallback)
  }

  async getAll(types: string[], callback: Function, errorCallback: Function) {
    await this.requestHandler(
      'get',
      `${baseURL}/get-all`,
      { params: { types } },
      callback,
      errorCallback
    )
  }
}

export default new TagApi()
