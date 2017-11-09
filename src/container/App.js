import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChatList from '../components/ChatList';
import TagList from '../components/TagList';
import {Input, Button, Tabs,Modal,Icon} from 'antd';
import {addMessage, addFL, addTLFC, addTULING,addKSFL,setHistory,setDoctor} from '../actions/index.js';
import Login from '../components/Login';
import {api} from '../const.js';
import './App.css';
import reply from '../reply';
const TabPane = Tabs.TabPane;

const {TextArea} = Input;

class App extends Component {
  state = {
    input_value: '',
    login_visible: false,
    regist_visible: false
  }
  showLogin = () => this.setState({login_visible:true})
  hideLogin = () => this.setState({login_visible:false})
  showRegist = () => this.setState({regist_visible:true})
  hideRegist = () => this.setState({regist_visible:false})
  send = (message) => {
    let tmpQ = [];
    const {age,sex,user}  = this.props.user;
    this
      .props
      .ask(message)
    document.getElementsByClassName('container_chat')[0].scrollTop = 9999999
    this.setState({input_value: ''});
    //console.log(this.props.user)
    fetch(`${api}/GetSimi`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({question: message,age,sex}),
        mode: 'cors'
      })
      .then(res => res.json())
      .then(data => {
        if (data.HD == 0 ){
          this
          .props
          .answer(reply());
        }else{
          this
          .props
          .answer(data.HD);
        }
        for (let key in data) {
          if (key.slice(0, 8) === 'question') {
            //问题
            tmpQ.push(data[key]);
          }
        }
        this.props.setDoctor({doc_keshi:data.doc_keshi,doc_name:data.doc_name,doc_shanchang:data.doc_shanchang});
        this
          .props
          .addQuestions(tmpQ);
        this
          .props
          .addTLFC(data.TLFC);
          this.props.addKSFL(data.KSFL)
        document.getElementsByClassName('container_chat')[0].scrollTop = 9999999;
        fetch('/history/add',{
          method:'POST',
          headers: {
            'Content-Type': ' application/json',
        },body: JSON.stringify({user,question:message,answer:data.HD})
        }).catch(e => console.log(e));
        this.setState({input_value: ''});
      })
      .catch(e => {
        this
           .props
          .answer(reply());
        document.getElementsByClassName('container_chat')[0].scrollTop = 9999999;
        this.setState({input_value: ''})
      });
    }
  componentWillReceiveProps(nextProps) {
    
  }
  componentWillMount = () => {
    window.doctor =  Math.round(Math.random() * 5);
    console.log(111111111)
  }
  
  render() {
    const {
      message_list,
      relate,
      FL,
      tlfc,
      tuling,
      addTuling,
      ksfl,
      user
    } = this.props;
    const {login_visible,regist_visible} = this.state;
    let tab_data = [];
    let tab_data_0=[],tab_data_1=[],tab_data_2=[],rest=[];
    for (let key in FL) {
      let each = []
      let count =1;
      for (let key_2 in FL[key]) {
        each.push(
          <p
            key={key_2}
            style={{
            cursor: 'pointer',marginBottom:'9px'
          }}
            onClick={() => {
            // fetch(`${api}/GetAnswer?index=${FL[key][key_2][Math.round(FL[key][key_2].length * Math.random())]}`)
            //   .then(res => res.json())
            //   .then(data => this.props.answer(data.HD))
            //   .catch(e => console.log(e))
            this.send(key_2);
          }}>{count++}. {key_2}</p>
        )
      }
      switch (ksfl.indexOf(key)){
        case 0:
        tab_data_0.push(
          <TabPane key={key} tab={key} style={{
            minHeight: '160px'
          }}>{each}</TabPane>
        );
        break;
        case 1:
        tab_data_1.push(
          <TabPane key={key} tab={key} style={{
            minHeight: '160px'
          }}>{each}</TabPane>
        );
        break;
        case 2:
        tab_data_2.push(
          <TabPane key={key} tab={key} style={{
            minHeight: '160px'
          }}>{each}</TabPane>
        );
        break;
        default:
        rest.push(<TabPane key={key} tab={key} style={{
          minHeight: '160px'
        }}>{each}</TabPane>)
      }
    }
    tab_data = [...tab_data_2,...tab_data_1,...tab_data_0,...rest].slice(0,3);
    return (
      <div className='container'>
        <div className='left_container'>
          <ChatList message_list={message_list} doctor={this.doctor}/>
          <div style={{
            position: 'relative'
          }}>
            <TextArea
              rows={4}
              style={{
              height: '100px',
              fontSize: '20px'
            }}
              value={this.state.input_value}
              onChange={(e) => this.setState({input_value: e.target.value})}
              onPressEnter={(e) => {
              this.send(this.state.input_value);
              e.preventDefault()
            }}/>
            <Button
              onClick={() => {
              this.send(this.state.input_value);
              this.setState({input_value: ''})
            }}
              style={{
              position: 'absolute',
              right: '13px',
              bottom: '6px'
            }}>发送</Button>
          </div>
        </div>
        <div className='right_container'>
          {/* <Login login={this.showLogin} cancelLogin={this.hideLogin} regist={this.showRegist} cancelRegist={this.hideRegist}/> */}
          <div className='relate'>
            <h3
              style={{
              color: 'black',
              fontWeight: 'bold'
            }}>相关问题</h3>
            <Tabs type="card">
              {tab_data}
            </Tabs>
          </div>
          <div className='recommend_doctor'>
            <h3 style={{
              color: 'black',
              fontWeight: 'bold'
            }}>推荐医生</h3>
            <p>姓名：{user.doctor.doc_name}</p>
            <p>科室：{user.doctor.doc_keshi}</p>
            <p>擅长：{user.doctor.doc_shanchang}</p>
          </div>
          <div className='taglist'>
            <TagList tagData={tlfc} click={(t) => this.props.addTuling(t)} tuling={tuling}/>
          </div>
        </div>

      </div>
    )
  }

  componentDidMount() {
    document.title = '医疗问答';  
    this.props.setHistory('main');
  }
}

function mapStateToProps(state) {
  return {message_list: state.message.messages, relate: state.message.relate, FL: state.message.fl, tlfc: state.message.tlfc, tuling: state.message.tuling,ksfl:state.message.ksfl,
  user:state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ask: (message) => {
      dispatch(addMessage({role: 'me', message}))
    },
    answer: (message) => {
      dispatch(addMessage({role: 'doctor', message}))
    },
    addQuestions: (questions) => {
      dispatch(addFL(questions))
    },
    addTLFC: (TLFCs) => {
      dispatch(addTLFC(TLFCs))
    },
    addTuling: (t) => {
      dispatch(addTULING(t))
    },
    addKSFL: (k) =>{
      dispatch(addKSFL(k))
    },
    setHistory: (history) =>{
      dispatch(setHistory(history))
    },
    setDoctor: (info) => {
      dispatch(setDoctor(info))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);