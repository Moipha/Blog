/**
 * 全局异常处理中间件
 */
import { NextFunction, Request, Response } from 'express'

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  // 记录日志
  console.error(err.stack)

  // 设置响应的HTTP状态码和发送错误信息
  res.status(500).json({
    code: 500,
    msg: '服务器内部错误',
    data: err.message
  })
}
