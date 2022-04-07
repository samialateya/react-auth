import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import global state manager
import { GlobalProvider } from './StateManager/AppContext';
//import bootstrap5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
ReactDOM.render(
  <React.StrictMode>
		<GlobalProvider>
			<App />
	</GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
