import axios from 'axios'
import qs from 'qs'
// import jsonP from 'jsonp'
import {
  MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// const host = 'http://119.23.255.177:8090/'
const host = 'http://192.168.3.22:9000/'
// const host = 'http://xcx.gdmeika.com/'
// const host = 'http://192.168.3.44:3000/'

/*
  配置 axios
*/
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
  //在发送 post 请求请设置一下数据格式
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  console.log('错误的传参！')
  return Promise.reject(error)
})


export default {

  host: host,
  /**
   * 出错提示函数
   * @param {object} error 错误对象 {return_code, return_msg}
   */
  APIError(error) {
    MessageBox.alert(error ? error.data.msg : error, '出错啦', {
      confirmButtonText: '确定',
    })
  },

  /**
   * 登录
   * @param {object} data 
   * @param {function} cb 回调
   */
  postLogin(data, cb) {
    axios.post(`${host}login`, data)
      .then(res => {
        if ('200' === res.data.code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取加盟商信息
   * @param {Function} cb 回调
   */
  getInfo(cb) {
    axios.get(`${host}info`)
      .then(res => {
        if ('200' === res.data.code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 提交加盟商信息
   * @param {Object} data {}
   * @param {Function} cb 回调
   */
  postInfo(data, cb) {
    axios.post(`${host}info`, data)
      .then(res => {
        if ('200' === res.data.code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  }
}
