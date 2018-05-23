import axios from 'axios';
import store from '@/store';

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
});

// 请求拦截
http.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = store.getters.token ; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, err => {
  console.log(err);
  Promise.reject(err);
});

// 响应拦截
http.interceptors.response.use(response => {
  /**
   * 通过response自定义errCode来标示请求状态
   */
  const res = response.data;
  switch (res.errCode) {
    // 请求成功的结果码
    case '00':
      return Promise.resolve(res.data);
    // token失效的结果码
    case '43':
      break;
    // 其他错误结果码
    default:
      
      return Promise.reject(res.errMsg);
  }
}, err => {
  console.log(err);

  return Promise.reject(errMsg);
});

export default http