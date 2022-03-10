import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state () {
    return {
      showNavDrawer: false,
      currentStation: {},
      currentSong: '',
      runtime: 0,
      volume: 0
    };
  },
  mutations: {
    updateShowNavDrawer(state, boolValue) {
      state.showNavDrawer = boolValue;
    },
    updateCurrentStation(state, stationObject) {
      state.currentlyPlaying = stationObject;
    },
    updateRuntime(state, runtime) {
      state.runtime = runtime;
    },
    updateCurrentSong(state, songName) {
      state.currentlyPlayingSong = songName;
    },
    updateVolume(state, volumeLevel) {
      state.volume = volumeLevel;
    }
  },
  actions: {
    toggleNavDrawer(context) {
      context.commit('updateShowNavDrawer', !context.state.showNavDrawer);
    },
    setCurrentStation(context, stationObject) {
      context.commit('updateCurrentStation', stationObject);
    },
    setRuntime(context, runtime) {
      context.commit('updateRuntime', runtime);
    },
    setCurrentSong(context, songName) {
      context.commit('updateCurrentSong', songName);
    },
    incrementRuntime(context) {
      context.commit('updateRuntime', context.state.runtime + 1);
    },
    setVolume(context, volumeLevel) {
      context.commit('updateVolume', volumeLevel);
    }
  }
});
