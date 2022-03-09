<template>
  <v-card
    flat
    color="transparent"
  >
    <v-subheader>Volume</v-subheader>
    <v-card-text>
    <v-slider
      v-model="media"
      prepend-icon="mdi-volume-high"
    ></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'VolumeControl',
  data() {
    return {
      media: 0
    };
  }
}
</script>
