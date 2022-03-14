import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import devReduxMiddleware from './devReduxMiddleware';
import { reducer } from './helpers/store';
import { Provider } from 'react-redux';
import { BasicObject } from 'interfaces/common';
import { StateInspector } from 'reinspect';

/** Redux DevTools extensions - Debug Redux code in Chrome * */
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const devReduxMiddlewareInstance: BasicObject = devReduxMiddleware();
const initialState = devReduxMiddlewareInstance.getState() ;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      devReduxMiddlewareInstance.middleware,
    ),
  ),
)

ReactDOM.render(
    <React.StrictMode>
      <StateInspector name="AppDQ">
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </StateInspector>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
