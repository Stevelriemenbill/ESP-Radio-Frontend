<template>
  <v-container>
    <v-row>
      <v-col md="4">
        <v-card>
          <v-card-title>Controls</v-card-title>
          <v-container>
            <v-row class="ma-5">
              <v-col class="lcd console">
                <v-row dense>
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
                  <v-col class="runtime">
                    {{ toHHMMSS(runtime) }}
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col class="station" v-if="typeof currentStation === 'string'">
                    {{ currentStation }}
                  </v-col>
                  <v-col class="station" v-else>
                    {{ currentStation.name }}
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col class="song">
                    {{ currentSong }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <VolumeControl/>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col md="8">
        <ChannelChooser/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import ChannelChooser from '../components/ChannelChooser.vue';
import VolumeControl from '../components/VolumeControl.vue';
import store from '../store/index';
import EspApi from "@/services/esp_api";

export default {
  name: 'RadioUI',
  data: () => ({
    eq1: 'eq-low',
    eq2: 'eq-low',
    eq3: 'eq-low',
    eq4: 'eq-low',
    eq5: 'eq-low',
    info: {},
    getSongInterval: null
  }),
  components: {
    ChannelChooser,
    VolumeControl
  },
  computed: {
    ...mapState(["currentStation", "currentSong", "runtime"]),
    ...mapGetters(["isPlaying"])
  },
  methods: {
    ...mapActions(["setCurrentSong", "setCurrentStation"]),
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
      if(store.getters.isPlaying) {
        this.eq1 = this.getRandomEqualizerState();
        this.eq2 = this.getRandomEqualizerState();
        this.eq3 = this.getRandomEqualizerState();
        this.eq4 = this.getRandomEqualizerState();
        this.eq5 = this.getRandomEqualizerState();
      } else {
        this.eq1 = 'eq-low';
        this.eq2 = 'eq-low';
        this.eq3 = 'eq-low';
        this.eq4 = 'eq-low';
        this.eq5 = 'eq-low';
      }
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
    getSong() {
      const espApi = new EspApi();
      espApi.getSong().then(response => {
        this.setCurrentSong(response.data.song);
      });
    }
  },
  created: function () {
    this.startEqualizer();
    if (this.getSongInterval !== null) {
      clearInterval(this.getSongInterval);
    }
    this.getSongInterval = setInterval(() => {
      console.log(this.currentStation);
      this.getSong();
    }, 3000);
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
  font-size: 25px;
  text-align: left;
}
.lcd {
  background-color: blue;
  border-radius: 5px;
}
.runtime {
  font-size: 30px;
}
.station {
  font-size: 20px;
}
.song {
  font-size: 15px;
}
.equalizer {
  padding: 2px;
}
.eq-bar {
  display: inline-block;
  background-color: white;
  margin-left: 2px;
  width: 10px;
}
.eq-low {
  height: 1px;
}
.eq-low-mid {
  height: 6px;
}
.eq-mid {
  height: 11px;
}
.eq-mid-high {
  height: 16px;
}
.eq-high {
  height: 21px;
}
</style>