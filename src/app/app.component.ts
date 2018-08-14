import { Component } from '@angular/core';
import { HueApiService } from './hueapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public heartBeat: Object = { response: 'Click Get Heartbeat To Test The Service First!' };
  public lights: Light[];
  public formattedLights: Light[];
  public lightGroups: LightGroup[] = [];
  private excludedGroups: Array<string> = ['8', '9'];

  constructor(private _hueApi: HueApiService) {
    this.getLights();
    this.getLightGroups();
  }

  getHeartbeat() {
    this._hueApi.getHeartbeat().subscribe(
      data => this.heartBeat = data,
      err => this.heartBeat = err,
      () => console.log(this.heartBeat)
    );
  }

  getLights() {
    this._hueApi.getLights().subscribe((data: Lights) => {
      // console.log('Data From Subscription: ', data);
      this.lights = data.lights;
    });
  }

  getLightGroups() {
    this._hueApi.getLightGroups().subscribe((LightGroups: LightGroup[]) => {
      // Filter Custom Light Groups
      this.lightGroups = LightGroups.filter(lightGroup => !this.excludedGroups.includes(lightGroup.id));
      this.lightGroups.sort(function (a, b) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

      // Change Group 0 Name to Whole Home
      this.lightGroups.forEach(lightGroup => {
        if (lightGroup.id === '0') {
          lightGroup.name = 'Whole Home';
          lightGroup.formattedLights = this.lights.sort(function (a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });
        } else {
          lightGroup.formattedLights = this.getLightsByGroup(lightGroup.lights);
        }
      });

      // Log For Development
      // console.log('Light Group From Subscription: ', LightGroups);

    });

  }

  getLightsByGroup(lightList: string[]): Light[] {
    this.formattedLights = [];

    lightList.forEach(light => {
      this.lights.forEach((lightInLights: Light) => {
        if (lightInLights.id === light) {
          this.formattedLights.push(lightInLights);
        }
      });
    });

    return this.formattedLights;
  }

  toggleLight(id) {
    this._hueApi.toggleLight(id).subscribe(response => {
      console.log('response', response);
    });
  }

  toggleLightGroup(id) {
    this._hueApi.toggleLightGroup(id).subscribe(responsebject => {
      console.log('response', responsebject);
      this.lightGroups.forEach(group => {
        if (group.id === id) {
          this.lights.forEach((currentLight: Light) => {
            currentLight.state.on = !currentLight.state.on;
          });
        }
      });
    });
  }

}

export interface LightGroup {
  id: string;
  name: string;
  type: string;
  lights?: (string)[] | null;
  formattedLights?: (Light)[] | null;
  state?: State | null;
  recycle?: boolean | null;
  class?: string | null;
  action?: Action | null;
}
export interface State {
  all_on: boolean;
  any_on: boolean;
}
export interface Action {
  on: boolean;
  bri: number;
  alert: string;
  hue?: number | null;
  sat?: number | null;
  effect?: string | null;
  xy?: (number)[] | null;
  ct?: number | null;
  colormode?: string | null;
}

export interface Lights {
  lights?: Light[] | null;
}
export interface Light {
  id: string;
  state: State;
  swupdate: Swupdate;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: Capabilities;
  config: Config;
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
}
export interface State {
  on: boolean;
  bri: number;
  alert: string;
  mode: string;
  reachable: boolean;
  hue?: number | null;
  sat?: number | null;
  effect?: string | null;
  xy?: (number)[] | null;
  ct?: number | null;
  colormode?: string | null;
}
export interface Swupdate {
  state: string;
  lastinstall?: null;
}
export interface Capabilities {
  certified: boolean;
  control: Control;
  streaming: Streaming;
}
export interface Control {
  mindimlevel: number;
  maxlumen: number;
  colorgamuttype?: string | null;
  colorgamut?: ((number)[] | null)[] | null;
  ct?: Ct | null;
}
export interface Ct {
  min: number;
  max: number;
}
export interface Streaming {
  renderer: boolean;
  proxy: boolean;
}
export interface Config {
  archetype: string;
  function: string;
  direction: string;
}

