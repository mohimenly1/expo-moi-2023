// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  token: localStorage.getItem('token') || null,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },
  clearToken(state) {
    state.token = null;
    localStorage.removeItem('token');
  },
};

const actions = {
  setToken({ commit }, token) {
    commit('setToken', token);
  },
  clearToken({ commit }) {
    commit('clearToken');
  },
};

const getters = {
  getToken: (state) => state.token,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
