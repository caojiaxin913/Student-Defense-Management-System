import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: {}
  },
  getters: {},
  mutations: {
    setUserinfo: (state, data) => {
      state.userinfo = data
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});

export default store;