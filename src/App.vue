<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="ESPRadio Logo"
          class="mr-2"
          contain
          src="@/assets/radio_logo_2.jpg"
          width="80"
        />

        <v-toolbar-title>Radio</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main>
      <RadioUI />
    </v-main>
  </v-app>
</template>

<script>
import RadioUI from './components/RadioUI';

export default {
  name: 'App',

  components: {
    RadioUI,
  },

  data: () => ({
    //
  }),
};
</script>
