import axios from 'axios'
// import store from '@/store'
import { getToken } from '@/utils/auth'
/**
 * http请求工具类
 * 请求拦截器 负责将客户端标识token值存储并放置在头部提交给服务端
 *
 * 响应拦截器 负责全局处理业务请求的网络或者业务错误
 */

// 创建一个axios实例
const http = axios.create({
  baseURL: process.env.BASE_API, // 基础URL
  timeout: 5000 // 超时时间
})

// 请求拦截
http.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, err => {
  console.log(err)
  Promise.reject(err)
})

// 响应拦截
http.interceptors.response.use(response => {
  console.log(response)
  /**
   * 通过response自定义errCode来标示请求状态
   */
  const status = response.status
  if (status === 200 || status === 201 || status === 204) {
    return response.data
  } else {
    return Promise.reject(new Error('error'))
  }
}, err => {
  // console.log(err)

  return Promise.reject(err)
})

export default http
