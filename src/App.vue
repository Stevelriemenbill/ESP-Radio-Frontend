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
      <v-spacer></v-spacer>
      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(point, i) in menuPoints"
            :key="i"
          >
            <v-list-item-title>{{ point.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
  data() {
    return {
      menuPoints: [
        {
          title: "Settings"
        }
      ]
    };
  }
};
</script>