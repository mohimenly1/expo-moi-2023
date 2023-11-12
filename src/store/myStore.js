import { createStore } from 'vuex'

export default createStore({
  state: {
    firstName: 'John',
    lastName: 'Doe'
  },

  getters: {
    fullName: function (state) {
      return `${state.firstName} ${state.lastName}`
    }
  }
})