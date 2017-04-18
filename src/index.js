import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import promise from 'redux-promise';
import App from './components/App';
import './index.css';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/css/style.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('root')
);
