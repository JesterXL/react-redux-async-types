import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux' 
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'


ReactDOM.render(
    <Provider store={createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
