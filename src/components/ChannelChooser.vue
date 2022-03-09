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
          name: 'Radio RST',
          url: 'http://mms.hoerradar.de:8000/rst128k',
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
      this.setCurrentlyPlayingStream(object.name);
      this.setRuntime(0);
      if (this.runtimeCounter !== null) {
        clearInterval(this.runtimeCounter);
      }
      this.runtimeCounter = setInterval(() => {
        this.incrementRuntime();
      }, 1000);
    }
  }
}
</script>
