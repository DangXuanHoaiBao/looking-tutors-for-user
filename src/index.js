import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import './styles/index.css';
import App from './components/App';
import indexReducer from './reducers/index';
import Alert from './components/Alert';


const store = createStore(
    indexReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <Alert />
        <App />
    </Provider>, 
    document.getElementById('root')
);