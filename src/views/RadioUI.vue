<template>
  <div>
    <ChannelChooser/>
    <VolumeControl/>
  </div>
</template>

<script>
import ChannelChooser from '../components/ChannelChooser.vue'
import VolumeControl from '../components/VolumeControl.vue'

export default {
  name: 'RadioUI',
  components: {
    ChannelChooser,
    VolumeControl
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>