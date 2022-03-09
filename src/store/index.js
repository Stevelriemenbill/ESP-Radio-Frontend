import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state () {
    return {
      showNavDrawer: false
    };
  },
  mutations: {
    setShowNavDrawer(state, boolValue) {
      state.showNavDrawer = boolValue;
    }
  },
  actions: {
    toggleNavDrawer(context) {
      context.commit('setShowNavDrawer', !context.state.showNavDrawer);
    },
  }
});
