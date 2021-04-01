import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/rootReducer'
import reduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import 'bootstrap/dist/css/bootstrap.min.css'

const composeEnhancers =
	typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		}) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, reduxThunk)))

const app = (
	<Provider store={store}>
		<App />
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
