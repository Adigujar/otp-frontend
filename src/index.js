import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';


ReactDOM.render(
   <AlertProvider template={AlertTemplate}>
    <App />
  </AlertProvider>,
  document.getElementById('root')
);

