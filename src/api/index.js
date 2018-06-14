import http from './../utils/http'

export default {
  loginByUsername (data) {
    return http({
      url: '/api/auth/login',
      method: 'post',
      data
    })
  },
  getUserInfo (params) {
    return http({
      url: '/api/auth/me',
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
