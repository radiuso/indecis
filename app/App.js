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
	<div>
		<h1 className="title">Indecis!</h1>
		<Home />
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
