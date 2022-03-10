import axios from 'axios';

export default class EspApi {

  async playStation(stationObject) {
    const url = stationObject.url.replace(/^https/i, "http");
    const params = 'url=' + url;
    return await axios.put('/actions/play', params);
  }

  async stopPlaying() {
    return await axios.put('/actions/stop');
  }

  async getSong() {
    return await axios.get('/radio/song');
  }

  async setVolume(value) {
    const params = "vollevel=" + value;
    return await axios.put('/actions/setvolume', params);
  }

  async getVolume() {
    return await axios.get('/radio/volume');
  }

  

}
