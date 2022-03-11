<template>
  <v-card class="mx-auto">
    <v-card-title>Stations</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col md="3">
            <v-text-field
              v-model="searchStations"
              label="Search for a Station Name"
              @input="filterStations"
            ></v-text-field>
          </v-col>
          <v-col md="2">
          </v-col>
          <v-col md="1">
            <v-btn icon @click="resetFilter"><v-icon>mdi-filter-variant-remove</v-icon></v-btn>
          </v-col>
          <v-col md="6">
            <v-autocomplete
              v-model="filterTags"
              :items="allTags"
              @input="filterStations()"
              outlined
              dense
              chips
              small-chips
              label="Filter Tags"
              multiple
              >
              <v-list-item
                slot="prepend-item"
                ripple
                @click="selectAll"
              >
                <v-list-item-action>
                  <v-icon :color="filterTags.length > 0 ? 'indigo darken-4' : ''">{{ selectIcon }}</v-icon>
                </v-list-item-action>
                <v-list-item-title>Select All</v-list-item-title>
              </v-list-item>
              <v-divider
                slot="prepend-item"
                class="mt-2"
              />
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row>
          <v-col>
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
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { RadioBrowserApi } from 'radio-browser-api';
import EspApi from "@/services/esp_api";

export default {
  name: 'ChannelChooser',
  data() {
    return {
      allStations: [],
      filteredStations: [],
      runtimeCounter: null,
      benched: 0,
      allTags: [],
      filterTags: [],
      searchStations: ''
    };
  },
  computed: {
    ...mapState(["runtime", "currentStation"]),
    selectIcon() {
      if (this.allSelected) return "mdi-checkbox-marked";
      if (this.someSelected) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    allSelected() {
      return this.filterTags.length === this.allTags.length;
    },
    someSelected() {
      return this.filterTags.length > 0 && !this.allSelected;
    },
  },
  methods: {
    ...mapActions(["setCurrentStation", "setRuntime", "incrementRuntime", "setCurrentSong"]),
    setStream(object) {
      const espApi = new EspApi();
      espApi.playStation(object).then(result => {
        console.log(result);
      })
      this.setCurrentStation(object);
      this.setRuntime(0);
      this.setCurrentSong('');
      if (this.runtimeCounter !== null) {
        clearInterval(this.runtimeCounter);
      }
      this.runtimeCounter = setInterval(() => {
        this.incrementRuntime();
      }, 1000);
    },
    stop() {
      const espApi = new EspApi();
      espApi.stopPlaying().then(result => {
        console.log(result);
      })
      this.setCurrentStation({});
      this.setRuntime(0);
      this.setCurrentSong('');
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
          var urlReplaced = station.url.replace(/^https/i, "http");
          station.url = urlReplaced;
          mp3Stations.push(station);
        }
      });
      this.allTags = uniqueTags;
      this.allStations = mp3Stations;
      this.filteredStations = mp3Stations;
    },
    filterStationsByTag() {
      var filteredStationsByTag = [];
      this.filteredStations.forEach((station) => {
        const tagIntersection = station.tags.filter(value => this.filterTags.includes(value));
        if (tagIntersection.length > 0) {
          filteredStationsByTag.push(station);
        }
      });
      this.filteredStations = filteredStationsByTag;
    },
    filterStations() {
      var stations = [];
      this.allStations.forEach((station) => {
        var tagIntersection = [];
        if (this.filterTags.length === 0) {
          tagIntersection.push('intersectdummy to get all stations when no filter is selected!');
        } else {
          tagIntersection = station.tags.filter(value => this.filterTags.includes(value));
        }
        if (tagIntersection.length > 0) {
          if (this.searchStations !== '') {
            if (station.name.match(new RegExp(this.searchStations, 'i')) ) {
              stations.push(station);
            }
          } else {
            stations.push(station);
          }
        }
      });
      stations.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));
      this.filteredStations = stations;
    },
    selectAll() {
      this.$nextTick(() => {
        if (this.allSelected) {
          this.filterTags = [];
        } else {
          this.filterTags = this.allTags;
        }
        this.filterStations();
      });
    },
    resetFilter() {
      this.filterTags = [];
      this.filterStations();
    },
    getStation() {
      const espApi = new EspApi();
      espApi.getStation().then(response => {
        var station = this.allStations.find(x => x.url === response.data.station);
        if (station !== null) {
          console.log(station);
          this.setCurrentStation(station);
        } else {
          this.setCurrentStation(response.data.station);
        }
      });
    }
  },
  created() {
    this.getStations();
    if (this.getStationInterval !== null) {
      clearInterval(this.getStationInterval);
    }
    this.getStationInterval = setInterval(() => {
      if (this.allStations.length > 0) {
        this.getStation();
      }
    }, 3000);
  }
}
</script>

<style scoped>
.active {
  background-color: turquoise;
}
</style>
