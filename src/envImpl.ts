import { mkC } from './domains/weather/temperature';
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

      type Temp = {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
      };

      type FeelsLike = {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };

      type Weather2 = {
        id: number;
        main: string;
        description: string;
        icon: string;
      };

      type Daily = {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: Temp;
        feels_like: FeelsLike;
        pressure: number;
        humidity: number;
        dew_point: number;
        wind_speed: number;
        wind_deg: number;
        weather: Weather2[];
        clouds: number;
        pop: number;
        uvi: number;
        rain?: number;
      };

      type RootObject = {
        lat: number;
        lon: number;
        timezone: string;
        timezone_offset: number;
        current: Current;
        daily: Daily[];
      };

      const key = '536dd89a8107e8f5f539928bf3f9225d';

      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${key}`
      )
        .then((res) => res.json())
        .then((res: RootObject) => {
          console.log(res);
          return mkC(res.current.temp);
        });
    },
    getForecastForDays: (lat, lon) => {
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

      type Temp = {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
      };

      type FeelsLike = {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };

      type Weather2 = {
        id: number;
        main: string;
        description: string;
        icon: string;
      };

      type Daily = {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: Temp;
        feels_like: FeelsLike;
        pressure: number;
        humidity: number;
        dew_point: number;
        wind_speed: number;
        wind_deg: number;
        weather: Weather2[];
        clouds: number;
        pop: number;
        uvi: number;
        rain?: number;
      };

      type RootObject = {
        lat: number;
        lon: number;
        timezone: string;
        timezone_offset: number;
        current: Current;
        daily: Daily[];
      };

      const key = '536dd89a8107e8f5f539928bf3f9225d';

      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${key}`
      )
        .then((res) => res.json())
        .then((res: RootObject) => {
          console.log(res);
          return res;
        });
    },
  },
};

export default envImpl;
