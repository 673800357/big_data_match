import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import {Provider, connect} from 'react-redux';
import configureStore from '../store';
import {Breadcrumb, Modal} from 'antd';
import App from './App';
import Info from './Info';
import Login from './Login';
import History from './History';
const store = configureStore();
const a = ['/login', '/history', '/info', '/main'];
class R extends Component {
  componentDidMount = () => {
    console.log(this.props.history)
  }

  render() {
    const {currentHistory} = this.props;
    let history_arr,
      currentStyle;
    switch (currentHistory) {
      case 'login':
        history_arr = ['用户登录'];
        currentStyle = {
          width: '450px',
          margin: '0 auto'
        };
        break;
      case 'history':
        history_arr = ['用户登录', '用户主页'];
        currentStyle = {
          width: '900px',
          margin: '0 auto'
        }
        break;
      case 'info':
        history_arr = ['用户登录', '用户主页', '病人信息'];
        currentStyle = {
          width: '650px',
          margin: '0 auto'
        }
        break;
      case 'main':
        history_arr = ['用户登录', '用户主页', '病人信息', '提问页面'];
        currentStyle = {
          width: '1200px',
          margin: '0 auto'
        }
        break;
      default:
        history_arr = [];
        console.log(history_arr)
    }
    return (
      <div>
        <Breadcrumb style={currentStyle}>
          {history_arr.map((item, index) => {
            return <Breadcrumb.Item key={index}>
              {item === '用户登录'
                ? <a
                    onClick=
                    {() => { console.log(item); if (item === '用户登录'){ Modal.confirm({content:'是否要登出？',onOk:() =>{ window.localStorage.removeItem('user'); window.location.href='/' }}) } }}>{item}</a>
                : <a href ={a[index]} onClick= {() => { }}>{item}</a>}
            </Breadcrumb.Item>
          })}
        </Breadcrumb>
        {this.props.children}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {currentHistory: state.user.history}
}
const wrapR = connect(mapStateToProps)(R)
class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={wrapR}>
            <IndexRedirect to="/login"/>
            <Route path="/login" component={Login}/>
            <Route path="/history" component={History}/>
            <Route path="/info" component={Info}/>
            <Route path="/main" component={App}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
export default Root;
