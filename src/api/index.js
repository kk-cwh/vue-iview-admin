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
  },
  addUser (data) {
    return http({
      url: '/api/users',
      method: 'post',
      data
    })
  },
  updateUser (data) {
    return http({
      url: `/api/users/${data.id}`,
      method: 'put',
      data
    })
  },
  deleteUser (data) {
    return http({
      url: `/api/users/${data.id}`,
      method: 'delete',
      data
    })
  }
}
