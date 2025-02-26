import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import path from 'path'
import db from './db/index.ts'
import cors from 'cors'
import https from 'https'
import fs from 'fs'
import { fileURLToPath } from 'url'
import 'express-async-errors'

const PORT: number = 8081
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 启动数据库连接
db(
  () => {
    // 创建服务器
    const app = express()
    // 配置跨域
    app.use(cors())
    // 配置静态资源路径
    app.use(express.static(path.join(__dirname, 'public')))
    // body处理中间件
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    // jwt验证中间件
    // app.use(async (req: Request, res: Response, next: NextFunction) => {
    //   const { default: jwtMiddleware } = await import('./middlewares/jwtMiddleware.ts')
    //   jwtMiddleware(req, res, next)
    // })

    // 路由
    app.use('/tag', async (req: Request, res: Response, next: NextFunction) => {
      const { default: TagRouter } = await import('./routers/TagRouter.ts')
      TagRouter(req, res, next)
    })
    app.use('/blog', async (req: Request, res: Response, next: NextFunction) => {
      const { default: BlogRouter } = await import('./routers/BlogRouter.ts')
      BlogRouter(req, res, next)
    })

    // 全局错误处理
    app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
      const { default: errorMiddleware } = await import('./middlewares/errorMiddleware.ts')
      errorMiddleware(err, req, res, next)
    })

    // 创建https服务器
    const sslOptions = {
      key: fs.readFileSync('./public/ssl/private.key'),
      cert: fs.readFileSync('./public/ssl/public.pem')
    }
    const server = https.createServer(sslOptions, app)
    // 启动服务器
    server.listen(PORT, () => {
      console.log(`Node 服务已在 ${PORT} 端口上运行`)
    })

    // // 启动服务器
    // app.listen(PORT, () => {
    //   console.log(`Node 服务已在 ${PORT} 端口上运行`)
    // })
  },
  () => {
    console.log('数据库连接失败')
  }
)
