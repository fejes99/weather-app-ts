import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EnvT } from './env';
import env from './envImpl';

export const EnvContext = createContext<EnvT>(env);

ReactDOM.render(
  <React.StrictMode>
    <EnvContext.Provider value={env}>
      <App />
    </EnvContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
