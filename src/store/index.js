import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state () {
    return {
      showNavDrawer: false,
      currentlyPlaying: '',
      currentlyPlayingSong: '',
      runtime: 0
    };
  },
  mutations: {
    updateShowNavDrawer(state, boolValue) {
      state.showNavDrawer = boolValue;
    },
    updateCurrentlyPlaying(state, url) {
      state.currentlyPlaying = url;
    },
    updateRuntime(state, runtime) {
      state.runtime = runtime;
    },
    updateCurrentSong(state, songName) {
      state.currentlyPlayingSong = songName;
    }
  },
  actions: {
    toggleNavDrawer(context) {
      context.commit('updateShowNavDrawer', !context.state.showNavDrawer);
    },
    setCurrentlyPlayingStream(context, url) {
      context.commit('updateCurrentlyPlaying', url);
    },
    setRuntime(context, runtime) {
      context.commit('updateRuntime', runtime);
    },
    setCurrentSong(context, songName) {
      context.commit('updateCurrentSong', songName);
    },
    incrementRuntime(context) {
      context.commit('updateRuntime', context.state.runtime + 1);
    }
  }
});
