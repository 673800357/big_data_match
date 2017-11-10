import React, {Component} from 'react'
import {setInfo,setHistory} from '../actions/index';
import {Button, Input, InputNumber, Select} from 'antd';
import {connect} from 'react-redux';
import './info.css';
const { TextArea } = Input;
const Option = Select.Option;
class Info extends Component {
  state = {
    name: '',
    age: '20',
    sex: '男'
  }
  handle = () => {
    this
      .props
      .setInfo(this.state);
    console.log(this.state)
    this.props.router.push('/main')
  }
  componentDidMount = () => {
    this.props.setHistory('info')
  }
  
  render() {
    const {name, age, sex} = this.state;
    return (
      <div className='info_container'>
        <img className='info_header' src={require('../static/head2.jpg')}/>
        <h1 style = {{alignSelf:'center'}}>病人信息填写</h1>
        <div  className='space'>
          姓名：<Input
            placeholder='your name'
            value={this.state.name}
            size='large'
            onChange={(e) => this.setState({name: e.target.value})}/></div>
        <div className='space'>
          年龄：<InputNumber
            min={1}
            max={99}
            step={1}
            size='large'
            defaultValue={20}
            onChange={(v => this.setState({age: v}))}/>
          性别：
          <Select
            defaultValue="男"
            style={{
            width: 120
          }}
            size='large'
            onChange={(v) => this.setState({sex: v})}>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
         
        </div>
          <div className='space'>
          过往病史：
          <TextArea rows={4} />
          </div>
        <Button type='primary' size='large' onClick={this.handle} disabled={!(name && sex && age)}>提交</Button>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setInfo: (data) => {
      dispatch(setInfo(data))
    },
    setHistory: (history) =>{
      dispatch(setHistory(history))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Info)