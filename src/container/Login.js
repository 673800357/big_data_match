import React, {Component} from 'react';
import './Login.css';
import {Tabs, Button,Input} from 'antd';
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
export default class Login extends Component {
    state = {
        name1: '',
        password1: '',
        name2: '',
        password2: '',
        intro: ''
    }
    login = () => {
        //点击登录
        this.props.router.push('/history')
    }
    regist = () => {
        //点击注册
        console.log(this.state.intro)
        this.props.router.push('/history')
    }
    render() {
        const {name1,name2,password2,password1,intro} = this.state;
        return (
            <div className="login_container">
                <h1 className="login_header">医疗问答系统</h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="登录" key="1">
                    用户名：<Input className="login_space" value={name1} onChange={(e) => this.setState({name1:e.target.value})}/>
                    密码：<Input className="login_space"  value={password1} type='password' onChange={(e) => this.setState({password1:e.target.value})}/>
                    <Button type='primary' onClick={this.login}>登录</Button>
                    </TabPane>
                    <TabPane tab="注册" key="2">
                    用户名：<Input className="login_space"  value={name2} onChange={(e) => this.setState({name2:e.target.value})}/>
                    密码：<Input className="login_space" value={password2} type='password' onChange={(e) => this.setState({password2:e.target.value})}/>
                    个人介绍：
                    <TextArea rows={4} className="login_space" onChange={(e) => this.setState({intro:e.target.value })} placeholder='....'/>
                    <Button type='primary' onClick={this.regist}>注册</Button>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
