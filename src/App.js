import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { save, load } from 'redux-localstorage-simple';
import { Provider } from 'react-redux';

import './App.css';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import VisibleQuotation from './scenes/Quotation/VisibleQuotation';
import Login from './scenes/Login/Login';
import rootReducer from './rootReducer';
/* eslint linebreak-style: ["error", "windows"] */
const middleware = [thunk];

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(...middleware, save())), // middleware
);

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppLayout className="App">
            <Switch>
              <Route exact path="/" render={() => (<VisibleQuotation />)} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={() => (<Login isLogout />)} />
            </Switch>
          </AppLayout>
        </Router>
      </Provider>
    );
  }
}

export default App;

const AppLayout = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 1200px;
  margin: auto;
  background: #FFFFFF;
  overflow-x: hidden;
`;
