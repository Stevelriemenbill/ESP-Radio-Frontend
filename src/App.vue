<template>
  <v-app>
    <v-app-bar
      app
      color="grey lighten-1"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-divider
          class="mx-4"
          vertical
      >
      </v-divider>
      <div class="d-flex align-center">
        <v-img
          alt="ESPRadio Logo"
          class="mr-2"
          contain
          src="@/assets/radio_logo_2.png"
          width="80"
        />
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