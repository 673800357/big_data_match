import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from '../store';
import App from './App';
import Info from './Info';
import Login from './Login';
import History from './History';
const store = configureStore();
class R extends Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}
class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={R}>
            <IndexRedirect to="/login"/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/history" component = {History}/>
            <Route path="/info" component={Info}/>
            <Route path="/main" component={App}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
