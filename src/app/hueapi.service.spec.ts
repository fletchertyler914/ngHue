import { TestBed, inject } from '@angular/core/testing';

import { HueapiService } from './hueapi.service';

describe('HueapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HueapiService]
    });
  });

  it('should be created', inject([HueapiService], (service: HueapiService) => {
    expect(service).toBeTruthy();
  }));
});
