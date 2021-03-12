import { Lon, Lat } from './types/Geo';
import { TemperatureT } from './domains/weather/temperature';

export type LoggerT = {
  log: (p: string) => void;
  error: (e: Error) => void;
};

export type GeoLocationT = {
  getCurrentLocation: () => Promise<[Lon, Lat]>;
  getCityLonLat: (query: string) => Promise<[Lon, Lat]>;
  getTemperature: (lat: Lat, lon: Lon) => Promise<TemperatureT>;
  getForecastForDays: (lat: Lat, lon: Lon) => Promise<any>;
};

export type EnvT = {
  logger: LoggerT;
  geoLocation: GeoLocationT;
};
