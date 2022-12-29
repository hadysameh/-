import React from 'react';
import logo from './logo.svg';
// import './App.css';
import routes  from './routes';
import axios from 'axios'
import { selectToken } from "./features/user";
import {  useSelector } from "react-redux";


function App() {
  const token = useSelector(selectToken);
  axios.defaults.headers.common['authorization'] =token;
 
  return routes
}

export default App;
