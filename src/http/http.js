import axIos from 'axios'
// import { Message } from 'element-ui'
// import store from '../store/store'

axIos.interceptors.response.use(response => {
  return response
}, error => {
  // if (error.response.status === 401) {
  //   setTimeout(() => {
  // Message.error(error.response.data.info)
  //   }, 1000)
  //   store.dispatch('token_actions', 'null')
  // }
  return error.response
})
