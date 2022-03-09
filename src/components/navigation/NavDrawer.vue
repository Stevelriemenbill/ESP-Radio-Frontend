<template>
  <v-navigation-drawer
    :value="showNavDrawer"
    absolute
    temporary
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group
        v-model="group"
        active-class="grey--text text--accent-4"
      >
        <v-list-item
          v-for="(point, i) in navPoints"
          :key="i"
          :to="point.route"
        >
          <v-list-item-icon>
            <v-icon>{{ point.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="point.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavDrawer",
  data() {
    return {
      navPoints: [
        {
          name: "Home",
          icon: "mdi-home",
          route: "/",
          routename: "home"
        },
        {
          name: "Testroute",
          icon: "mdi-account",
          route: "/test",
          routename: "test"
        }
      ],
      group: null
    };
  },
  computed: {
    ...mapState(["showNavDrawer"])
  }
};
</script>