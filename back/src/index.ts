import express from 'express'
import path from 'path'
import db from './db/index.ts'
import cors from 'cors'
import { fileURLToPath } from 'url'

const PORT: number = 27017
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
    app.use(() => import('./middlewares/jwtMiddleware.ts') as any)
    // // github验证
    // app.use('/auth/github', require('./routers/GithubAuth'))
    // // 配置路由
    // app.use('/user', require('./routers/UserRouter'))
    // app.use('/msg', require('./routers/MessageRouter'))
    // app.use('/friendship', require('./routers/FriendshipRouter'))
    // app.use('/read', require('./routers/ReadRouter'))

    // 全局错误处理
    app.use(() => import('./middlewares/errorMiddleware.ts') as any)

    // 启动服务器
    app.listen(PORT, () => {
      console.log(`Node 服务已在 ${PORT} 端口上运行`)
    })
  },
  () => {
    console.log('数据库连接失败')
  }
)
