import request from '@/utils/request'

export function getData() {
    return request({
      url: '/users',
      method: 'get',
      data: ''
    })
}
export function getList() {
    return request({
      url: '/list',
      method: 'get',
      data: ''
    })
}
