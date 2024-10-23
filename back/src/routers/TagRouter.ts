import express from 'express'
import { body, query } from 'express-validator'
import argsCheck from '../utils/argsCheck.ts'
import service from '../services/TagService.ts'
import Result from '../types/Result.ts'

const router = express.Router()

// 新增标签
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('未提供标签名称'),
    body('type').isIn(['blog', 'code', 'general']).withMessage('提供的标签类型无效')
  ],
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    const newTag = await service.add(req.body)
    res.status(200).json(Result.success(newTag))
  }
)

// 获取标签列表
router.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  if (!argsCheck(req, res)) return
  const tags = await service.list()
  res.status(200).json(Result.success(tags))
})

export default router
