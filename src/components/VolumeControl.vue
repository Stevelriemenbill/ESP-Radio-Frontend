<template>
  <v-card
    flat
    color="transparent"
  >
    <v-card-text>
    <v-slider
      append-icon="mdi-volume-high"
      @change="changeVolume($event)"
    >
      <template v-slot:prepend>
        <v-icon :color="muteColor" @click="muteSound">
          mdi-volume-mute
        </v-icon>
      </template>
    </v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import EspApi from "@/services/esp_api";

export default {
  name: 'VolumeControl',
  data() {
    return {
      volume: 0,
      muteColor: 'grey',
      muted: false
    };
  },
  methods: {
    ...mapActions(["setVolume"]),
    muteSound() {
      if (this.muted) {
        this.setVolume(this.volume);
      } else {
        this.setVolumeAPI(0);
      }
      this.muted = !this.muted;
    },
    changeVolume(value) {
      this.setVolumeAPI(value);
    },
    setVolumeAPI(value) {
      const espApi = new EspApi();
      espApi.setVolume(value).then(response => (console.log(response)));
    },
    getVolume() {
      const espApi = new EspApi();
      espApi.getVolume().then(response => {
        this.volume = response.data.volume;
        this.setVolume(response.data.volume);
      });
    }
  },
  created() {
    this.getVolume();
  }
}
</script>
