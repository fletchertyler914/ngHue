import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HueApiService {

  public baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // Uses http.get() to load data from a single API endpoint
  getHeartbeat() {
      return this.http.get(this.baseUrl + '/api/heartbeat');
  }

  getLights() {
    console.log('Get Lights From Hue Bridge Service');
    return this.http.get(this.baseUrl + '/api/listLights');
  }

  getLightGroups() {
    console.log('Get Light Groups From Hue Bridge Service');
    return this.http.get(this.baseUrl + '/api/listLightGroups');
  }

  toggleLight(id) {
    console.log('Toggle Light From Hue Bridge Service: ' + this.baseUrl + '/api/toggleLight/' + id);
    return this.http.get(this.baseUrl + '/api/toggleLight/' + id);
  }

  toggleLightGroup(id) {
    console.log('Toggle Light Group From Hue Bridge Service: ' + this.baseUrl + '/api/toggleLightGroup/' + id);
    return this.http.get(this.baseUrl + '/api/toggleLightGroup/' + id);
  }
}
