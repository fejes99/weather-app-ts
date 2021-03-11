import { mkC, TemperatureT } from './domains/weather/temperature';
import { EnvT } from './env';

const envImpl: EnvT = {
  logger: {
    log: console.log,
    error: console.error,
  },
  geoLocation: {
    getCurrentLocation: () => {
      const p = new Promise((res: PositionCallback, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });

      return p.then(({ coords }) => [coords.latitude, coords.longitude]);
    },
    getCityLonLat: (query) => {
      type Address = {
        city: string;
        county: string;
        state: string;
        postcode: string;
      };

      type Response = {
        place_id: number;
        lat: string;
        lon: string;
        icon: string;
        address: Address;
      };

      return fetch(
        `https://nominatim.openstreetmap.org/search?q=${escape(query)}&format=json&polygon=1&addressdetails=1`
      )
        .then((res) => res.json())
        .then((res: [Response]) => {
          res.length > 0 && console.log([Number.parseFloat(res[0].lat), Number.parseFloat(res[0].lon)]);
          return res.length > 0 ? [Number.parseFloat(res[0].lat), Number.parseFloat(res[0].lon)] : [0, 0];
        });
      //
    },
    getTemperature: (lat, lon) => {
      type Weather = {
        id: number;
        main: string;
        description: string;
        icon: string;
      };

      type Current = {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        weather: Weather[];
      };

      type Weather2 = {
        id: number;
        main: string;
        description: string;
        icon: string;
      };

      type Rain = {
        hour: number;
      };

      type Hourly = {
        dt: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        weather: Weather2[];
        pop: number;
        rain: Rain;
      };

      type RootObject = {
        lat: number;
        lon: number;
        timezone: string;
        timezone_offset: number;
        current: Current;
        hourly: Hourly[];
      };

      const key = '536dd89a8107e8f5f539928bf3f9225d';

      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${key}`
      )
        .then((res) => res.json())
        .then(
          (res: RootObject): TemperatureT => {
            console.log(res);
            return mkC(res.current.temp);
          }
        );
    },
  },
};

export default envImpl;
