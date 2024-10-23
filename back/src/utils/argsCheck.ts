/**
 * 请求参数校验
 */
import express from 'express'
import { validationResult } from 'express-validator'

export default (req: express.Request, res: express.Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      code: 400,
      msg: '不合法的Body参数',
      data: errors.array()
    })
    return false
  }
  return true
}
