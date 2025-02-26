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
router.get(
  '/',
  [
    query('type').isIn(['blog', 'code', 'general', '']).withMessage('提供的标签类型无效'),
    query('pageSize').isInt().withMessage('提供的页大小无效'),
    query('pageNum').isInt().withMessage('提供的页数无效')
  ],
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    const [tag, total] = await service.list(req.query as any)
    res.status(200).json(Result.success({ records: tag, total }))
  }
)

// 更新标签
router.put(
  '/',
  [
    body('_id').isMongoId().withMessage('提供的标签ID无效'),
    body('name').notEmpty().withMessage('未提供标签名称'),
    body('type').isIn(['blog', 'code', 'general']).withMessage('提供的标签类型无效')
  ],
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    await service.update(req.body)
    res.status(200).json(Result.success())
  }
)
// 删除标签
router.delete(
  '/',
  [query('id').isMongoId().withMessage('提供的标签ID无效')],
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    await service.delete(req.query.id as string)
    res.status(200).json(Result.success())
  }
)

router.get(
  '/get-all',
  [query('types').isArray().withMessage('提供的标签类型无效')],
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    const tags = await service.getAllTagsByTypes(req.query.types as any)
    res.status(200).json(Result.success(tags))
  }
)

export default router
