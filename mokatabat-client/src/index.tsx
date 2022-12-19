import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index";
import { Provider } from "react-redux";
import { removeAuthData } from "./features/user";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {hasAddWaredPremission} from './utils/premissions'

const bc = new BroadcastChannel("test_channel");
//@ts-ignore
window.bc = bc;
bc.onmessage = (event) => {
  let data = event.data;
  if (data.type == "loggedin") {
    // console.log({ data });

    window.location.href = "/";
  }
  if (data.type == "loggedout") {
    // console.log({ data });
    store.dispatch(removeAuthData());
    window.location.href = "/login";

    // localStorage.removeItem('token')
    // window.location.reload()
  }
};
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
