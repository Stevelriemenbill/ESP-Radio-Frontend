import axios from 'axios';

export default class EspApi {

  async playStation(stationObject) {
    const params = new URLSearchParams();
    params.append('station', stationObject.url);
    return await axios.get('/actions/station', {params: params});
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
