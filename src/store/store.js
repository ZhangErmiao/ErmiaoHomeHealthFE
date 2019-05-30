import Vue from 'vue'
import Vuex from 'vuex'
// import {ls} from './pageStore.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    token: '',
    path: ['/', '1']
  },
  mutations: {
    changePath (state, path) {
      state.path = [path] // 点击header时才用
      localStorage.setItem('path', state.path)
    },
    addChildPath (state, child) {
      state.path.push(child)
      localStorage.setItem('path', state.path)
    },
    isLogIn (state, obj, days) {
      state.user = obj.user
      state.token = 'Bearer ' + obj.token
      let Days = days || 1
      let exp = new Date()
      let expires = exp.getTime() + Days * 24 * 60 * 60 * 1000
      localStorage.setItem('Authorization', state.token)
      localStorage.setItem('userMessage', JSON.stringify(state.user))
      localStorage.setItem('userTime', JSON.stringify(expires))
      // ls.setItem(obj, 7)
    },
    isLogOut (state) {
      localStorage.removeItem('Authorization')
      localStorage.removeItem('userMessage')
      state.user = {}
      state.token = ''
      // ls.removeItem()
    }
  },
  actions: {
    changePath ({commit}, path) {
      commit('changePath', path)
    },
    addChildPath ({commit}, child) {
      commit('addChildPath', child)
    },
    isLogIn ({commit}, obj) {
      commit('isLogIn', obj)
    },
    isLogOut ({commit}) {
      commit('isLogOut')
    }
  }
})
export default store
