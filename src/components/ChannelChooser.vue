<template>
  <v-card height="100px">
    <v-container>
      <v-row>
        <v-col>
          <v-card v-for="station in stations" :key="station.stationuuid">
            <v-card-title>
              {{ station.name }}
            </v-card-title>
            <v-card-text>
              <v-img :src="station.favicon"></v-img>
            </v-card-text>
            <v-card-actions>
              <v-btn icon @click="setStream(station)"><v-icon>mdi-play</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
      stations: [],
      runtimeCounter: null
    };
  },
  computed: {
    ...mapState(["runtime"])
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
    async getStations() {
      const api = new RadioBrowserApi('My Radio App');
      const stations = await api.searchStations({
        countryCode: 'US',
        limit: 100,
        offset: 1 // 1 - is the second page
      });
      this.stations = stations;
    }
  },
  created() {
    this.getStations();
  }
}
</script>
