import http from './../utils/http'

export default {
  loginByUsername (data) {
    return http({
      url: '/api/login',
      method: 'post',
      data
    })
  },
  getUserInfo (params) {
    return http({
      url: '/api/user_info',
      method: 'get',
      params
    })
  },
  getUserList (params) {
    return http({
      url: '/api/users',
      method: 'get',
      params
    })
  }
}
