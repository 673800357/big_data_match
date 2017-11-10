import React, { Component } from 'react';
import './Login.css';
import { Tabs, Button, Input, Modal } from 'antd';
import {  setUser,setHistory } from '../actions/index';
import { connect } from 'react-redux';
import md5 from 'md5';
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
class Login extends Component {
    state = {
        name1: '',
        password1: '',
        name2: '',
        password2: '',
        intro: ''
    }
    componentDidMount = () => {
      this.props.setHistory('login');
    }
    
    login = () => {
        //点击登录
        fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({ user: this.state.name1, password: md5(this.state.password1) })
        }).then(res => res.json()).then(data => {
            if (data.status === 'ok') {
                this.props.setUser(data.user);
                window.localStorage.setItem('user',data.user)
                this.props.router.push('/history');
            } else {
                Modal.error({content:data.message})
               // window.location.reload();
            }
        }).catch(e => console.log(e));
    }
    regist = () => {
        //点击注册
        fetch('/user/regist', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({ user: this.state.name2, password: md5(this.state.password2) })
        }).then(res => res.json()).then(data => {
            if (data.status === 'ok') {
                this.props.setUser(data.user);
                const ref = Modal.info({content:'注册成功，即将跳转....'});
                setTimeout(() =>{
                    ref.destroy();
                    this.props.router.push('/history')
                }, 3000);
                
            } else {
                console.log(data)
                Modal.error({content:data.message})
               //window.location.reload();
            }
        }).catch(e => console.log(e)); 
    }
    render() {
        const { name1, name2, password2, password1, intro } = this.state;
        return (
            <div className="login_container">
                <h1 className="login_header">医疗问答系统</h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="登录" key="1">
                        用户名：<Input className="login_space" value={name1} onChange={(e) => this.setState({ name1: e.target.value })} />
                        密码：<Input className="login_space" value={password1} type='password' onChange={(e) => this.setState({ password1: e.target.value })} />
                        <Button type='primary' disabled = {!(password1 && name1)} onClick={this.login}>登录</Button>
                    </TabPane>
                    <TabPane tab="注册" key="2">
                        用户名：<Input className="login_space" value={name2} onChange={(e) => this.setState({ name2: e.target.value })} />
                        密码：<Input className="login_space" value={password2} type='password' onChange={(e) => this.setState({ password2: e.target.value })} />
                        个人介绍：
                    <TextArea rows={4} className="login_space" onChange={(e) => this.setState({ intro: e.target.value })} placeholder='....' />
                        <Button type='primary' disabled = {!(password2 && name2)} onClick={this.regist}>注册</Button>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUser: (user) => {
            dispatch(setUser({ user }))
        },
        setHistory: (history) =>{
          dispatch(setHistory(history))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)