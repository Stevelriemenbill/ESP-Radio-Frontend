<template>
  <v-card class="mx-auto">
    <v-card-title>Stations</v-card-title>
    <v-card-text>
      <v-text-field
        label="Search for a Station Name"
        @input="filterStations"
      ></v-text-field>
      <v-virtual-scroll
        :bench="benched"
        :items="filteredStations"
        height="500"
        item-height="70"
      >
        <template v-slot:default="{ item }">
          <v-list-item :key="item.stationuuid" v-bind:class="{ active: item.name == currentlyPlaying }">
            <v-list-item-avatar>
              <v-img v-if="item.favicon" :src="item.favicon" contain max-height="40" max-width="100" class="mx-auto"></v-img>
              <v-img v-else src="@/assets/no_image.png" contain max-height="40" max-width="100" class="mx-auto"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
                <v-chip><v-icon color="red">mdi-heart</v-icon>{{ item.votes }}</v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.tags.join(', ') }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn v-if="item.name == currentlyPlaying" icon @click="stop">
                <v-icon>
                  mdi-stop
                </v-icon>
              </v-btn>
              <v-btn v-else icon @click="setStream(item)">
                <v-icon>
                  mdi-play
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { RadioBrowserApi } from 'radio-browser-api';
import axios from 'axios';

export default {
  name: 'ChannelChooser',
  data() {
    return {
      allStations: [],
      filteredStations: [],
      runtimeCounter: null,
      benched: 0
    };
  },
  computed: {
    ...mapState(["runtime", "currentlyPlaying"])
  },
  methods: {
    ...mapActions(["setCurrentlyPlayingStream", "setRuntime", "incrementRuntime"]),
    setStream(object) {
      const params = new URLSearchParams();
      params.append('station', object.url);
      axios
        .get('/service/radio', {params: params})
        .then(response => (this.info = response));
      this.setCurrentlyPlayingStream(object.name);
      this.setRuntime(0);
      if (this.runtimeCounter !== null) {
        clearInterval(this.runtimeCounter);
      }
      this.runtimeCounter = setInterval(() => {
        this.incrementRuntime();
      }, 1000);
    },
    stop() {
      axios
        .put('/actions/stop', {params: params})
      this.setCurrentlyPlayingStream('');
      this.setRuntime(0);
      if (this.runtimeCounter !== null) {
        clearInterval(this.runtimeCounter);
      }
    },
    async getStations() {
      const api = new RadioBrowserApi('My Radio App');
      const stations = await api.searchStations({
          countryCode: 'DE'
      });
      stations.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));
      var mp3Stations = [];
      stations.forEach(function (station) {
        if (station.codec === "MP3") {
          mp3Stations.push(station);
        }
      });
      this.allStations = mp3Stations;
      this.filteredStations = mp3Stations;
    },
    filterStations(name) {
      var stations = [];
      this.allStations.forEach(function (station) {
        if (station.name.match(new RegExp(name, 'i')) ) {
          stations.push(station);
        }
      });
      stations.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));
      this.filteredStations = stations;
    }
  },
  created() {
    this.getStations();
  }
}
</script>

<style scoped>
.active {
  background-color: turquoise;
}
</style>
