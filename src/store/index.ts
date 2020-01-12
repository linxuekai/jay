import Vue from 'vue'
import Vuex from 'vuex'
const jayAll = require('../assets/zjInfo.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jayAll: jayAll.sort((a: ZJ, b: ZJ) => a.year - b.year)
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
