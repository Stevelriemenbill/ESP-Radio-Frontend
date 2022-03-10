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
import axios from 'axios';
import { mapActions } from 'vuex';

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
      const params = "vollevel=" + value;
      axios
        .put('/actions/setvolume', params)
        .then(response => (this.info = response));
    },
    getVolume() {
      axios
        .get('/radio/volume')
        .then(response => {
          this.volume = response;
          this.setVolume(response);
        });
    }
  },
  created() {
    this.getVolume();
  }
}
</script>
