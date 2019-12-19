import Vue from 'vue'
// 导入vuex状态管理器包
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: 'null',
  username: '',
  isSuper: ''
}

const getters = {
  token_getters (state) {
    if (state.token === 'null') {
      if (sessionStorage.getItem('token') === null) {
        return 'null'
      } else {
        state.token = sessionStorage.getItem('token')
        return sessionStorage.getItem('token')
      }
    } else {
      return state.token
    }
  },
  username_getters (state) {
    if (state.username === '') {
      if (sessionStorage.getItem('username') === '') {
        return '无'
      } else {
        state.username = sessionStorage.getItem('username')
        return sessionStorage.getItem('username')
      }
    } else {
      return state.username
    }
  },
  isSuper_getters (state) {
    if (state.isSuper === '') {
      if (sessionStorage.getItem('isSuper') === '') {
        return '无'
      } else {
        state.isSuper = sessionStorage.getItem('isSuper')
        return sessionStorage.getItem('isSuper')
      }
    } else {
      return state.isSuper
    }
  }
}

const mutations = {
  token_mutations (state, token) {
    sessionStorage.setItem('token', token)
    state.token = token
  },
  username_mutations (state, username) {
    sessionStorage.setItem('username', username)
    state.username = username
  },
  isSuper_mutations (state, isSuper) {
    sessionStorage.setItem('isSuper', isSuper)
    state.isSuper = isSuper
  }
}

const actions = {
  token_actions (context, token) {
    context.commit('token_mutations', token)
  },
  username_actions (context, username) {
    context.commit('username_mutations', username)
  },
  isSuper_actions (context, isSuper) {
    context.commit('isSuper_mutations', isSuper)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// 导出store对象
export default store
