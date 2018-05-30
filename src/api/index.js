import http from './../utils/http'

export default {
  loginByUsername (username, password) {
    const params = {
      username,
      password
    }
    return http({
      url: '/api/bins/wolhi',
      method: 'get',
      params
    })
  },
  getUserInfo (token) {
    return http({
      url: '/api/bins/wolhi',
      method: 'get',
      params: { token }
    })
  }
}
