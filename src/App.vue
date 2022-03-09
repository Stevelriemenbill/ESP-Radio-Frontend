<template>
  <v-app>
    <AppBar />
    <NavDrawer />
    <router-view/>
  </v-app>
</template>

<script>
export default {
  components: {
    AppBar: () => import("@/components/navigation/AppBar.vue"),
    NavDrawer: () => import("@/components/navigation/NavDrawer")
  }
};
</script>
