<template>
    <v-container>
        <v-row class="text-center">
            <v-spacer></v-spacer>
            <v-col>
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
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'VolumeControl',
}
</script>
