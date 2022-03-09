import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state () {
    return {
      showNavDrawer: false,
      currentlyPlaying: ''
    };
  },
  mutations: {
    setShowNavDrawer(state, boolValue) {
      state.showNavDrawer = boolValue;
    },
    setCurrentlyPlaying(state, url) {
      state.currentlyPlaying = url;
    }
  },
  actions: {
    toggleNavDrawer(context) {
      context.commit('setShowNavDrawer', !context.state.showNavDrawer);
    },
    setCurrentlyPlayingStream(context, url) {
      context.commit('setCurrentlyPlaying', url);
    },
  }
});
