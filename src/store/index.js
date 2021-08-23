import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: {
      token: '',
      received: 0
    },
    user: {
      account: '',
      role: 0,
      email: '',
      _id: '',
      avatar: '',
      username: '',
      cart: []
    }
  },
  mutations: {
    login (state, data) {
      state.jwt.token = data.token
      state.jwt.received = new Date().getTime()
      state.user.account = data.account
      state.user.role = data.role
      state.user.email = data.email
      state.user._id = data._id
      state.user.avatar = (data.avatar) ? `${process.env.VUE_APP_API}/files/${data.avatar}` : ''
      state.user.username = data.username
      state.user.cart = data.cart
    },
    changecart (state, data) {
      state.user.cart = data
    },
    changeinfo (state, data) {
      state.user.avatar = (data.avatar) ? `${process.env.VUE_APP_API}/files/${data.avatar}` : ''
      state.user.username = data.username
    },
    logout (state) {
      state.jwt = {
        token: '',
        received: 0
      }
      state.user = {
        account: '',
        role: 0,
        email: '',
        _id: '',
        avatar: '',
        username: '',
        cart: []
      }
    },
    extend (state, data) {
      state.jwt.token = data
      state.jwt.received = new Date().getTime()
    },
    getinfo (state, data) {
      state.user.account = data.account
      state.user.role = data.role
      state.user.email = data.email
      state.user._id = data._id
      state.user.avatar = (data.avatar) ? `${process.env.VUE_APP_API}/files/${data.avatar}` : ''
      state.user.username = data.username
      state.user.cart = data.cart
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    user (state) {
      return { islogin: state.user.account.length > 0, isAdmin: state.user.role === 1, isavatar: state.user.avatar.length > 0, ...state.user }
    }
  },
  plugins: [createPersistedState()]
})
