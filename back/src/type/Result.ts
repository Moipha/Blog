export default class Result {
  constructor(public code: number, public msg: string, public data?: object) {}

  static success(data: object, msg = '操作成功') {
    return new Result(200, msg, data)
  }

  static error(code: number = 400, msg: string = '操作失败', data?: object) {
    return new Result(code, msg, data)
  }
}
