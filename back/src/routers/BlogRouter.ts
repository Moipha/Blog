import express from 'express'
import { body, param, query } from 'express-validator'
import argsCheck from '../utils/argsCheck.ts'
import service from '../services/BlogService.ts'
import Result from '../types/Result.ts'

const router = express.Router()

// 新增文章
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('未提供标题'),
    body('content').notEmpty().withMessage('未提供内容'),
    body('author').notEmpty().withMessage('未提供作者'),
    body('tags').optional().isArray().withMessage('提供的标签无效')
  ],
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    const newBlog = await service.add(req.body)
    res.status(200).json(Result.success(newBlog))
  }
)
// 获取分页数据
router.get(
  '/',
  [
    query('tags').optional().isArray().withMessage('提供的标签无效'),
    query('pageSize').isInt().withMessage('提供的页大小无效'),
    query('pageNum').isInt().withMessage('提供的页数无效')
  ],
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    const [blogs, total] = await service.list(req.query as any)
    res.status(200).json(Result.success({ record: blogs, total }))
  }
)
// 更新文章
router.put(
  '/',
  [
    body('_id').isMongoId().withMessage('提供的文章ID无效'),
    body('title').notEmpty().withMessage('未提供标题'),
    body('tags').isArray().withMessage('提供的标签无效'),
    body('content').notEmpty().withMessage('未提供内容')
  ],
  (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    service.update(req.body)
    res.status(200).json(Result.success())
  }
)
// 删除文章
router.delete(
  '/',
  [query('id').isMongoId().withMessage('提供的文章ID无效')],
  (req: express.Request, res: express.Response): void => {
    if (!argsCheck(req, res)) return
    service.delete(req.query.id as string)
    res.status(200).json(Result.success())
  }
)

// 根据id获取文章
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('提供的文章ID无效')],
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    const blog = await service.getById(req.params.id)
    res.status(200).json(Result.success(blog))
  }
)

export default router
