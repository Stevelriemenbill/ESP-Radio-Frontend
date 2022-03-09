import Vue from 'vue';
import VueRouter from 'vue-router';
import RadioUI from '../views/RadioUI.vue';
import VolumeControl from '../components/VolumeControl.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: RadioUI
  },
  {
    path: '/test',
    name: 'test',
    component: VolumeControl
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
