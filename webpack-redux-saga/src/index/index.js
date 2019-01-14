import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import Hello from './components/Hello';
import './scss/index.scss';

ReactDOM.render(
	<Provider store={store}>
		<Hello />
	</Provider>,
	document.getElementById('root')
);
