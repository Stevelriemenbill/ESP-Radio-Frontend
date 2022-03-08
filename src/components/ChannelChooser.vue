<template>
   <v-container>
        <v-row class="text-center">
            <v-spacer></v-spacer>
            <v-col>
                <v-card
                    flat
                    color="transparent"
                >
                    <v-subheader>Stations</v-subheader>
                    <v-card-text>
                        <v-select
                        v-model="select"
                        :items="stations"
                        item-text="name"
                        item-value="url"
                        label="Radio Stations"
                        return-object
                        single-line
                        ></v-select>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'ChannelChooser',
  data: () => ({
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
          },
        ],
    }),
}
</script>