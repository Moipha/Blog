export default class Result {
  code: number
  msg: string
  data: object
  constructor(code: number, msg: string, data: object) {
    this.code = code
    this.msg = msg
    this.data = data
  }

  static success(data: object = {}, msg: string = '操作成功'): Result {
    return new Result(200, msg, data)
  }

  static error(code: number = 400, msg: string = '操作失败', data: object = {}): Result {
    return new Result(code, msg, data)
  }
}
