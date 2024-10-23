import mongoose from 'mongoose'

export default (success: () => void, error: () => void) => {
  // const { DB_HOST, DB_PORT, DB_NAME } = process.env
  const { DB_HOST, DB_PORT, DB_NAME } = { DB_HOST: '127.0.0.1', DB_PORT: 27017, DB_NAME: 'blog' }
  if (typeof error !== 'function') {
    error = () => {
      console.log('数据库连接失败...')
    }
  }
  // 连接数据库
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

  // 生命周期
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功...')
    success()
  })
  mongoose.connection.on('error', () => {
    console.log('数据库连接失败...')
    error()
  })
  mongoose.connection.on('close', () => {
    console.log('数据库连接已断开...')
  })
}
