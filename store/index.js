import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
const store = () => new Vuex.Store({
  state: {
    projectsList: []
  },
  mutations: {
    changeData(data) {
      state.projectsList = data
    }
  }
})
export default store