import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from 'components/home';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './App.scss';

const App = () => (
  <MuiThemeProvider>
	<div className="main">
		<div className="header">
			<h1 className="title">Indecis!</h1>
			<img className="wise" src="assets/images/wise.png" alt="image d'un sage"/>
		</div>
		<Home />
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
