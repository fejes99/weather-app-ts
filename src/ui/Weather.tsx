import React, { useContext, useEffect, useState } from 'react';
import { EnvContext } from '..';
import { convertTemp, mkC, TemperatureT } from '../domains/weather/temperature';
import { getCityLonLat, getCurrentLocation, getTemperature } from '../domains/weather/weather';

import Search from './Search';
import Map from './Map';
import DayCard from './Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import './Weather.css';

export default function Weather(this: any) {
  const env = useContext(EnvContext);

  const [city, setCity] = useState('');
  const [lonLat, setLonLat] = useState<[number, number]>([0, 0]);
  const [temp, setTemp] = useState<TemperatureT>(mkC(0));

  useEffect(() => {
    getTemperature(env, lonLat[0], lonLat[1]).then((res) => setTemp(res));
  }, [env, lonLat]);

  const findMyLocation = () => {
    getCurrentLocation(env).then((lonLat) => setLonLat(lonLat));
  };

  const showTemp = () => {
    getCityLonLat(env, city).then((lonLat) => setLonLat(lonLat));
  };

  const convertTo = (m: 'C' | 'K' | 'F') => {
    const convertedTemp = convertTemp(temp, m);
    setTemp(convertedTemp);
  };

  const handleInputChange = (newCity: string) => {
    setCity(newCity);
  };

  const renderMap = () => {
    return (
      <div>
        {lonLat[0] === 0 ? (
          <div></div>
        ) : (
          <h3>
            {temp.val.toFixed(2)} {temp.__tag}
            <div>
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={() => convertTo('C')}>C</Button>
                <Button onClick={() => convertTo('K')}>K</Button>
                <Button onClick={() => convertTo('F')}>F</Button>
              </ButtonGroup>
            </div>
            <Map center={lonLat} />
          </h3>
        )}
      </div>
    );
  };

  return (
    <div>
      <Search onChange={(value) => handleInputChange(value)} onSubmit={() => showTemp()} text={city} />
      <Button onClick={() => findMyLocation()} variant="contained" color="primary">
        Locate me
      </Button>
      <h3>
        Lat: {lonLat[0].toFixed(2)} <br />
        Lon: {lonLat[1].toFixed(2)}
      </h3>
      <Button variant="contained" color="primary" onClick={() => showTemp()}>
        Get temperature
      </Button>
      <DayCard />
      {renderMap()}
    </div>
  );
}
