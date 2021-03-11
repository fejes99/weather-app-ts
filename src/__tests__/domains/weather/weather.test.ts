import * as weatherDomain from '../../../domains/weather/weather';
import { EnvT } from '../../../env';

const xs: Array<string> = [];

const testEnv: EnvT = {
  logger: {
    log: (str) => {
      xs.push(str);
    },
    error: console.error,
  },
  geoLocation: {
    getCurrentLocation: () => Promise.resolve([1, 1]),
    lookup: (query) => {
      if (query === 'Novi Sad') {
        return Promise.resolve([19.0, 46.1]);
      }
      return Promise.resolve([100, 100]);
    },
  },
};

describe('Weather domain tests', () => {
  test('getCityLonLat returns lon and lat', async () => {
    const noviSadLoc = await weatherDomain.getCityLonLat(testEnv, 'Novi Sad');
    expect(noviSadLoc).toEqual([19.0, 46.1]);
    expect(xs).toEqual(['Getting Location of Novi Sad']);

    const otherCity = await weatherDomain.getCityLonLat(testEnv, 'Belgrade');
    expect(otherCity).toEqual([100, 100]);
    expect(xs).toEqual(['Getting Location of Novi Sad', 'Getting Location of Belgrade']);
  });
});

export {};
