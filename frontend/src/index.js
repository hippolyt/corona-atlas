import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { StoreProvider } from './state/store'

ReactDOM.render(
  <StoreProvider initialValue={{ booking: { slotId: null, slotDate: null, patient: null, stage: "DAY_SELECTION" } }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
