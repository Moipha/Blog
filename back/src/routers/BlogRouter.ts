import express from 'express'
import { body, param, query } from 'express-validator'
import argsCheck from '../utils/argsCheck.ts'
import service from '../services/BlogService.ts'
import tagService from '../services/TagService.ts'
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
    if (req.body.tags && req.body.tags.length > 0) {
      await Promise.all(
        req.body.tags.map((tagId: string) => tagService.updateTagTimes(tagId, true))
      )
    }
    res.status(200).json(Result.success(newBlog))
  }
)
// 获取分页数据
router.get(
  '/',
  [
    query('title').isString().withMessage('提供的标题无效'),
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
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    await service.delete(req.query.id as string)
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

// 增长浏览记录
router.put('/view/:id', async (req: express.Request, res: express.Response): Promise<void> => {
  const id = req.params.id
  await service.addViews(id)
  res.status(200).json(Result.success())
})

// 修改点赞数
router.put(
  '/like',
  [
    body('id').isMongoId().withMessage('提供的文章ID无效'),
    body('plus').isBoolean().withMessage('提供的参数无效')
  ],
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!argsCheck(req, res)) return
    // 增加或减少一个点赞量
    const { id, plus } = req.body
    if (plus) {
      await service.addLikes(id)
    } else {
      await service.minusLikes(id)
    }
    res.status(200).json(Result.success())
  }
)

export default router
