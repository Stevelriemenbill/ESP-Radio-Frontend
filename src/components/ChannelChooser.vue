<template>
  <v-card
    flat
    color="transparent"
  >
    <v-card-text>
      <v-select
        :items="stations"
        item-text="name"
        item-value="url"
        label="Radio Stations"
        return-object
        single-line
        @change="setStream"
      >
      </v-select>
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
      stations: [
        {
          name: 'Jazz Radio',
          url: 'http://jazz.streamr.ru/jazz-64.mp3',
          icon: ''
        },
        {
          name: 'Antenne 1',
          url: 'http://stream.antenne1.de/80er/livestream2.mp3',
          icon: ''
        }
      ],
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
      console.log(stations);
    }
  }
}
</script>
