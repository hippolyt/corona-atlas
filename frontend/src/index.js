import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';

import { StoreProvider } from './state/store'
import { initialState as initialBookState } from './flows/book';
import { initialState as initialAdminState } from './flows/admin';

ReactDOM.render(
  <StoreProvider initialValue={{ booking: initialBookState(), admin: initialAdminState() }}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </StoreProvider >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
