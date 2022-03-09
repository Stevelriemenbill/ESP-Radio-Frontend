<template>
  <v-container>
    <v-row no-gutters>
      <v-col md="2">
        On / Off
        <v-btn
          icon
          color="red"
        >
          <v-icon>mdi-power</v-icon>
        </v-btn>
      </v-col>
      <v-col md="2"></v-col>
      <v-col md="4">
        <ChannelChooser/>
      </v-col>
      <v-col md="2"></v-col>
      <v-col md="2">
        <VolumeControl/>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col md="4"></v-col>
      <v-col md="4">
        Currently playing: {{ currentlyPlaying }}
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
    ...mapState(["currentlyPlaying"])
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
</style>