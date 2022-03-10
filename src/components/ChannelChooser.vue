<template>
  <v-card class="mx-auto">
    <v-card-title>Stations
      <v-spacer />
        <v-btn
          icon
          @click="tagFilterVisible = !tagFilterVisible"
        >
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-autocomplete
          v-model.trim.lazy="filterTags"
          :items="allTags"
          @change="filterStations('')"
          outlined
          dense
          chips
          small-chips
          label="Tags"
          multiple
          v-if="tagFilterVisible"
          :justify="end"
          cols="1"
          >
        </v-autocomplete>
      </v-col>
    </v-card-actions>
    <v-card-text>
      <v-text-field
        label="Search for a Station Name"
        @input="filterStations"
      ></v-text-field>
      <v-virtual-scroll
        :bench="benched"
        :items="filteredStations"
        height="500"
        item-height="70"
      >
        <template v-slot:default="{ item }">
          <v-list-item :key="item.stationuuid" v-bind:class="{ active: item.name == currentStation.name }">
            <v-list-item-avatar>
              <v-img v-if="item.favicon" :src="item.favicon" contain max-height="40" max-width="100" class="mx-auto"></v-img>
              <v-img v-else src="@/assets/no_image.png" contain max-height="40" max-width="100" class="mx-auto"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
                <v-chip><v-icon color="red">mdi-heart</v-icon>{{ item.votes }}</v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.tags.join(', ') }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn v-if="item.name == currentStation.name" icon @click="stop">
                <v-icon>
                  mdi-stop
                </v-icon>
              </v-btn>
              <v-btn v-else icon @click="setStream(item)">
                <v-icon>
                  mdi-play
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { RadioBrowserApi } from 'radio-browser-api';
import axios from 'axios';

export default {
  name: 'ChannelChooser',
  data() {
    return {
      allStations: [],
      filteredStations: [],
      runtimeCounter: null,
      benched: 0,
      allTags: [],
      info: {},
      filterTags: [],
      tagFilterVisible: false
    };
  },
  computed: {
    ...mapState(["runtime", "currentStation"])
  },
  methods: {
    ...mapActions(["setCurrentStation", "setRuntime", "incrementRuntime"]),
    setStream(object) {
      const params = new URLSearchParams();
      params.append('station', object.url);
      axios
        .get('/service/radio', {params: params})
        .then(response => (this.info = response));
      this.setCurrentStation(object);
      this.setRuntime(0);
      if (this.runtimeCounter !== null) {
        clearInterval(this.runtimeCounter);
      }
      this.runtimeCounter = setInterval(() => {
        this.incrementRuntime();
      }, 1000);
    },
    stop() {
      axios
        .put('/actions/stop')
      this.setCurrentStation({});
      this.setRuntime(0);
      if (this.runtimeCounter !== null) {
        clearInterval(this.runtimeCounter);
      }
    },
    async getStations() {
      const api = new RadioBrowserApi('My Radio App');
      const stations = await api.searchStations({
          countryCode: 'DE'
      });
      stations.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));
      var mp3Stations = [];
      var uniqueTags = [];
      stations.forEach(function (station) {
        if (station.codec === "MP3") {
          station.tags.forEach(function (tag) {
            if (!uniqueTags.includes(tag)) {
              uniqueTags.push(tag);
            }
          });
          mp3Stations.push(station);
        }
      });
      this.allTags = uniqueTags;
      this.allStations = mp3Stations;
      this.filteredStations = mp3Stations;
    },
    filterStations(name) {
      var stations = [];
      var filters = this.filterTags;
      this.allStations.forEach(function (station) {
        var hasTag = false;
        station.tags.every(function (tag) {
          if (filters.includes(tag)) {
            hasTag = true;
            return false;
          }
        });
        if(!hasTag) {
          return;
        } else {
          if (station.name.match(new RegExp(name, 'i')) ) {
            stations.push(station);
          }
        }
      });
      stations.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));
      this.filteredStations = stations;
    }
  },
  created() {
    this.getStations();
  }
}
</script>

<style scoped>
.v-list{
  height:300px;
  width: 200px;
  overflow-y:auto;
}
.active {
  background-color: turquoise;
}
</style>
