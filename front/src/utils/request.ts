import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
import router from '@/router'

const { token } = storeToRefs(useUserStore())
const { VITE_PORT, VITE_IP, VITE_PROTOCOL } = import.meta.env

const request = axios.create({
  baseURL: `${VITE_PROTOCOL}://${VITE_IP}:${VITE_PORT}`,
  timeout: 1000 * 5,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 响应拦截器
request.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      // 如果token过期，跳转到登录页面
      router.push('/login')
    }
    console.error('错误的响应: ' + err.response.data.msg)
    alert('错误的响应: ' + err.response.data.msg)
    for (let item of err.response.data.data) {
      console.error(item.msg)
    }

    return Promise.reject(err.response.data)
  }
)
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 如果本地保存了token，携带token发送请求
    if (token.value) {
      config.headers['Authorization'] = token.value
    }
    return config
  },
  (err) => {
    console.error('请求拦截器发生错误:', err)
    return Promise.reject(err)
  }
)

export default request
