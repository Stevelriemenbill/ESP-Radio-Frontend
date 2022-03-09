<template>
  <v-card
    flat
    color="transparent"
  >
    <v-subheader>Stations</v-subheader>
    <v-card-text>
      <v-select
        :items="stations"
        item-text="name"
        item-value="url"
        label="Radio Stations"
        return-object
        single-line
      >
      </v-select>
    </v-card-text>
  </v-card>
</template>

<script>
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
      ]
    };
  }
}
</script>
