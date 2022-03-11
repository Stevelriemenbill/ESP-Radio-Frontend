import axios from 'axios';

export default class EspApi {

  async playStation(stationObject) {
    const url = stationObject.url.replace(/^https/i, "http");
    const params = new URLSearchParams([['url', url]]);
    // const params = 'url=' + url;
    return await axios.get('/actions/play', {params: params});
  }

  async stopPlaying() {
    return await axios.get('/actions/stop');
  }

  async getStation() {
    return await axios.get('/radio/station');
  }

  async getSong() {
    return await axios.get('/radio/song');
  }

  async setVolume(value) {
    const params = new URLSearchParams([['vollevel', value]]);
    // const params = "vollevel=" + value;
    return await axios.get('/actions/setvolume', {params: params});
  }

  async getVolume() {
    return await axios.get('/radio/volume');
  }

}
