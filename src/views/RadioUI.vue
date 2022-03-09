<template>
  <v-container>
    <v-row no-gutters>
      <v-col md="4">
        <v-card>
          <v-row dense>
            <v-col class="pa-3 lcd console">
              <v-row dense>
                <v-col>
                  <v-icon v-if="currentlyPlaying" color="white">mdi-stop</v-icon>
                  <v-icon v-else color="white">mdi-play</v-icon>
                </v-col>
                <v-col>
                  <v-icon color="white">mdi-skip-backward</v-icon>
                </v-col>
                <v-col>
                  <v-icon color="white">mdi-skip-forward</v-icon>
                </v-col>
                <v-col>
                  <div class="equalizer">
                    <div :class="eq1" class="eq-bar">
                      <span></span>
                    </div>
                    <div :class="eq2" class="eq-bar">
                      <span></span>
                    </div>
                    <div :class="eq3" class="eq-bar">
                      <span></span>
                    </div>
                    <div :class="eq4" class="eq-bar">
                      <span></span>
                    </div>
                    <div :class="eq5" class="eq-bar">
                      <span></span>
                    </div>
                  </div>
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
            </v-col>
          </v-row>
        </v-card>
        <v-row>
          <v-col>
            <VolumeControl/>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="8">
        <ChannelChooser/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import ChannelChooser from '../components/ChannelChooser.vue'
import VolumeControl from '../components/VolumeControl.vue'

export default {
  name: 'RadioUI',
  data: () => ({
    eq1: 'eq-low',
    eq2: 'eq-low',
    eq3: 'eq-low',
    eq4: 'eq-low',
    eq5: 'eq-low'
  }),
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
    },
    startEqualizer() {
      if (this.eqUpdater !== null) {
        clearInterval(this.eqUpdater);
      }
      this.eqUpdater = setInterval(() => {
        this.updateEqualizer();
      }, 100);
    },
    updateEqualizer() {
      this.eq1 = this.getRandomEqualizerState();
      this.eq2 = this.getRandomEqualizerState();
      this.eq3 = this.getRandomEqualizerState();
      this.eq4 = this.getRandomEqualizerState();
      this.eq5 = this.getRandomEqualizerState();
    },
    getRandomEqualizerState() {
      var state = Math.floor(Math.random() * 5);
      if(state == 0) {
        return 'eq-low';
      }
      if(state == 1) {
        return 'eq-low-mid';
      }
      if(state == 2) {
        return 'eq-mid';
      }
      if(state == 3) {
        return 'eq-mid-high';
      }
      if(state == 4) {
        return 'eq-high';
      }
    },
  },
  created: function () {
    this.startEqualizer();
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
.equalizer {
  padding:2px;
}
.eq-bar {
  display: inline-block;
  background-color: white;
  margin-left: 2px;
  width: 3px;
}
.eq-low {
  height: 3px;
}
.eq-low-mid {
  height: 6px;
}
.eq-mid {
  height: 9px;
}
.eq-mid-high {
  height: 12px;
}
.eq-high {
  height: 15px;
}
</style>