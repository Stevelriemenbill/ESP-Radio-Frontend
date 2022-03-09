<template>
  <v-container>
    <v-row no-gutters>
      <v-col md="4"></v-col>
      <v-col md="4">
        <ChannelChooser/>
      </v-col>
      <v-col md="4"></v-col>
    </v-row>
    <v-row dense>
      <v-col md="4"></v-col>
      <v-col md="4" class="pa-3 lcd console">
        <div>
          <v-row dense>
            <v-col>
              <v-icon v-if="currentlyPlaying" color="white">mdi-stop</v-icon>
              <v-icon v-else color="white">mdi-play</v-icon>
            </v-col>
            <v-col>
            </v-col>
            <v-col>
              <v-icon color="white">mdi-skip-backward</v-icon>
            </v-col>
            <v-col>
              <v-icon color="white">mdi-skip-forward</v-icon>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              Radio Station:
            </v-col>
            <v-col>
              {{ currentlyPlaying }}
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              Runtime:
            </v-col>
            <v-col>
              {{ toHHMMSS(runtime) }}
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              Song:
            </v-col>
            <v-col>
              {{ currentSong }}
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col md="4"></v-col>
    </v-row>
    <v-row>
      <v-col md="4"></v-col>
      <v-col md="4">
        <VolumeControl/>
      </v-col>
      <v-col md="4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import ChannelChooser from '../components/ChannelChooser.vue'
import VolumeControl from '../components/VolumeControl.vue'

export default {
  name: 'RadioUI',
  components: {
    ChannelChooser,
    VolumeControl
  },
  computed: {
    ...mapState(["currentlyPlaying", "currentSong", "runtime"])
  },
  methods: {
    toHHMMSS(string) {
      var sec_num = string; // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.console {
  font-family: 'Courier New', Courier, monospace;
  color: white;
  font-size: 16px;
  text-align: left;
}
.lcd {
  background-color: blue;
}
</style>