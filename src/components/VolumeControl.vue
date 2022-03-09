<template>
  <v-card
    flat
    color="transparent"
  >
    <v-subheader>Volume</v-subheader>
    <v-card-text>
    <v-slider
      v-model="media"
      append-icon="mdi-volume-high"
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
export default {
  name: 'VolumeControl',
  data() {
    return {
      media: 0,
      muteColor: 'grey'
    };
  },
  methods: {
    muteSound(value) {
      console.log(value);
    }
  }
}
</script>
