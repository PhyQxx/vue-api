import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000, // 请求超时时间
    transformRequest: data => qs.stringify(data) 
});
  // request请求拦截器
  //ES6
instance.interceptors.request.use(
    e => {
      console.log(e);
      if(sessionStorage.getItem('Token')){
        e.headers.common['Token'] = sessionStorage.getItem('Token');
      }
        //set 默认值
        return e
    },
    error => ({ status: 0, msg: error.message })
);
// respone响应拦截器
instance.interceptors.response.use(
res => {
    const resp = res.data; //数据处理，此处若不做处理，接口请求中返回的数据就是最原始状态
    if (res.status === 200) {
    return resp
    }
    return resp
},
error => {
    console.log('err' + error); // for debug
    return Promise.reject(error)
}
);
export default instance
