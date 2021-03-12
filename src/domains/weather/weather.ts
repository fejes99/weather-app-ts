import { EnvT } from '../../env';
import { Lat, Lon } from '../../types/Geo';
import { TemperatureT } from './temperature';

type City = string;
type getCurrentLocationT = (env: EnvT) => Promise<[Lon, Lat]>;
export const getCurrentLocation: getCurrentLocationT = ({ logger, geoLocation }) => {
  logger.log('Getting Our Location');
  return geoLocation.getCurrentLocation();
};

type getCityLonLatT = (env: EnvT, city: City) => Promise<[Lon, Lat]>;
export const getCityLonLat: getCityLonLatT = ({ logger, geoLocation }, city) => {
  logger.log(`Getting Location of ${city}`);
  return geoLocation.getCityLonLat(city);
};

type getTemperatureT = (env: EnvT, lat: Lat, lon: Lon) => Promise<TemperatureT>;
export const getTemperature: getTemperatureT = ({ logger, geoLocation }, lat, lon) => {
  logger.log(`Temperature for ${lat}, ${lon}`);
  return geoLocation.getTemperature(lat, lon);
};
