import { Blog } from '@/type'
import request from '@/utils/request'

const baseURL = '/blog'

class BlogApi {
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
      tags: string[]
      title: string
      enable: boolean
      pageNum: number
      pageSize: number
    },
    callback: Function,
    errorCallback: Function
  ) {
    await this.requestHandler('get', baseURL, { params: condition }, callback, errorCallback)
  }

  async create(
    data: {
      title: string
      author: string
      content: string
      tags: string[]
      enable: boolean
      desc: string
    },
    callback: Function,
    errorCallback: Function
  ) {
    await this.requestHandler('post', baseURL, data, callback, errorCallback)
  }

  async update(data: Blog, callback: Function, errorCallback: Function) {
    await this.requestHandler('put', baseURL, data, callback, errorCallback)
  }

  async delete(id: string, callback: Function, errorCallback: Function) {
    await this.requestHandler('delete', baseURL, { params: { id } }, callback, errorCallback)
  }

  async getById(id: string, callback: Function, errorCallback: Function) {
    await this.requestHandler('get', `${baseURL}/${id}`, {}, callback, errorCallback)
  }
}

export default new BlogApi()
