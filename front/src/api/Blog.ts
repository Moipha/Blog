import { Blog } from '@/type'
import request from '@/utils/request'

const baseURL = '/blog'

class BlogApi {
  // 统一格式
  private async requestHandler(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    dataOrParams: any,
    callback: Function = () => {},
    errorCallback: Function = () => {},
    finallyCallback: Function = () => {}
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
    } finally {
      finallyCallback()
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
    errorCallback: Function,
    finallyCallback: Function
  ) {
    await this.requestHandler(
      'get',
      baseURL,
      { params: condition },
      callback,
      errorCallback,
      finallyCallback
    )
  }

  async create(
    data: {
      title: string
      author: string
      content: string
      tags: string[]
      enable: boolean
      desc: string
      cover: string
    },
    callback: Function,
    errorCallback: Function,
    finallyCallback: Function
  ) {
    await this.requestHandler('post', baseURL, data, callback, errorCallback, finallyCallback)
  }

  async update(data: Blog, callback: Function, errorCallback: Function, finallyCallback: Function) {
    await this.requestHandler('put', baseURL, data, callback, errorCallback, finallyCallback)
  }

  async delete(id: string, callback: Function, errorCallback: Function, finallyCallback: Function) {
    await this.requestHandler(
      'delete',
      baseURL,
      { params: { id } },
      callback,
      errorCallback,
      finallyCallback
    )
  }

  async getById(
    id: string,
    callback: Function,
    errorCallback: Function,
    finallyCallback: Function
  ) {
    await this.requestHandler(
      'get',
      `${baseURL}/${id}`,
      {},
      callback,
      errorCallback,
      finallyCallback
    )
  }

  async view(id: string, callback: Function) {
    await this.requestHandler('put', `${baseURL}/view/${id}`, {}, callback)
  }

  async changeLike(id: string, plus: boolean, callback: Function) {
    await this.requestHandler('put', `${baseURL}/like`, { plus, id }, callback)
  }

  // 检索信息
  async search(
    params: {
      keyword: string
      pageNum: number
      pageSize: number
    },
    callback: Function,
    finallyCallback: Function
  ) {
    await this.requestHandler(
      'get',
      `${baseURL}/search`,
      { params },
      callback,
      () => {},
      finallyCallback
    )
  }
}

export default new BlogApi()
